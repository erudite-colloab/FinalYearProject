import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import TicketsScreen from '../screens/TicketsScreen';
import SelectSeatScreen from '../screens/SelectSeatScreen';
import PickupDropoffScreen from '../screens/PickUpDropOffScreen';
import PassengerDetailsScreen from '../screens/PassengerDetailsScreen';

const Stack = createStackNavigator();

const TicketsStack = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' }
      });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'flex' },
        });
      };
    }, [navigation])
  );

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen 
        name="Ticket" 
        component={TicketsScreen} 
        //options={{ tabBarVisible: false }} 
      />
      <Stack.Screen 
        name="SelectSeat" 
        component={SelectSeatScreen} 
        // options={({ route }) => ({
        //   tabBarStyle: { display: 'none' }
        // })}
      />
      <Stack.Screen
        name='PickUpDropOff'
        component={PickupDropoffScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name='PassengerDetails'
        component={PassengerDetailsScreen}
        options={{
          headerShown: true,
          title: 'Passenger Details',
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
    </Stack.Navigator>
  );
};

export default TicketsStack;
