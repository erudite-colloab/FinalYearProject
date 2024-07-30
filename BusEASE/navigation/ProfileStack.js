import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import VerifyPhoneScreen from '../screens/VerifyPhoneScreen';
import OTPverification from '../screens/OTPverification';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Profiles' 
        component={ProfileScreen} 
        options={{
          headerShown: true,
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#1E60ED',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24
          },
        }}
      />
      <Stack.Screen
      name='EditProfile'
      component={EditProfileScreen}
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen 
        name="VerifyPhone"
        component={VerifyPhoneScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{
          headerShown: false,
        }}
      />

      
     
    </Stack.Navigator>
  );
};

export default ProfileStack;
