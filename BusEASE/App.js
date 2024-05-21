import React, {useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GetStartedScreen from './screens/GetStartedScreen';
import OnboardingScreen1 from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import ForgotPassword from './screens/ForgotPassword';
import CreateNewPasswordScreen from './screens/NewPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import OTPverification from './screens/OTPverification';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Onboarding'
          component={OnboardingScreen1}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='GetStarted'
          component={GetStartedScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: false,
            
          }}
        />
        <Stack.Screen 
          name='Signup'
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name='ForgotPassword'
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name='OTPverification'
          component={OTPverification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name='NewPassword'
          component={CreateNewPasswordScreen}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
