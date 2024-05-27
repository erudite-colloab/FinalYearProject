
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen1 from '../screens/OnboardingScreen';
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createNativeStackNavigator();

const OnboardingNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen1} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    </Stack.Navigator>
  )
}

export default OnboardingNav;