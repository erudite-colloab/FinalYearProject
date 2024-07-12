import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen'; 
import ForgotPassword from '../screens/ForgotPassword';
import CreateNewPasswordScreen from '../screens/NewPasswordScreen';
import OTPverification from '../screens/OTPverification';
import OnboardingScreen1 from "../screens/OnboardingScreen";
import GetStartedScreen from "../screens/GetStartedScreen";


const Stack = createStackNavigator();

export default function AuthStack () {
    return (
        <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="LoginScreen" >
            <Stack.Screen name="Onboarding" component={OnboardingScreen1} />
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OTPverification" component={OTPverification} />
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen} />
        </Stack.Navigator>
    )

}