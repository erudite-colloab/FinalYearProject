import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Profiles' component={ProfileScreen} options={{headerShown: false}}/>
     
    </Stack.Navigator>
  );
};

export default ProfileStack;
