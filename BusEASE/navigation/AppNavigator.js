import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainNavigator from './MainNavigator';
//import LoadingScreen from '../screens/LoadingScreen';
//import GetStartedScreen from '../screens/GetStartedScreen';

import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import OnboardingNav from '../navigation/OnboardingNav';

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
   const [ user, setUser ] = useState(null);
   const [ isLoading, setIsLoading ] = useState(true);

  
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      console.log("user", user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
    
  return (
    
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <AppStack.Screen 
                    name="MainNavigator"
                    component={MainNavigator}
                    //options={{ headerShown: false }}
                />
            ) : (
              <>
                <AppStack.Screen
                    name='Onboarding'
                    component={OnboardingNav}
                    //options={{ headerShown: false }}
                /> 
                <AppStack.Screen
                    name='AuthStack'
                    component={AuthStack}
                    //options={{ headerShown: false }}
                />
              </>    
            )}
        </AppStack.Navigator>
   
    
  );
}

export default AppNavigator;