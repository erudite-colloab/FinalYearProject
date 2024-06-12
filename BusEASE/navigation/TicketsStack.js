import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TicketsScreen from '../screens/TicketsScreen';

const Stack = createStackNavigator();

const TicketsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Ticket" component={TicketsScreen}  />
    </Stack.Navigator>
  );
};

export default TicketsStack;
