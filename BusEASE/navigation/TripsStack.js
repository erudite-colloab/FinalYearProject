import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripsScreen from '../screens/TripsScreen';

const Stack = createStackNavigator();

const TripsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trips" component={TripsScreen}  />
    </Stack.Navigator>
  );
};

export default TripsStack;
