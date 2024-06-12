import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripsScreen from '../screens/TripsScreen';

const Stack = createStackNavigator();

const TripsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="Trip" component={TripsScreen}  />
    </Stack.Navigator>
  );
};

export default TripsStack;
