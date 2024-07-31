import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TicketsScreen from '../screens/TicketsScreen';
import SelectSeatScreen from '../screens/SelectSeatScreen';
import PickupDropoffScreen from '../screens/PickUpDropOffScreen';
import PassengerDetailsScreen from '../screens/PassengerDetailsScreen';
import SummaryScreen from '../screens/SummaryScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

const TicketsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Ticket" 
        component={TicketsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="SelectSeat" 
        component={withHideTabBar(SelectSeatScreen)}
      />
      <Stack.Screen 
        name="PickUpDropOff" 
        component={withHideTabBar(PickupDropoffScreen)} 
      />
      <Stack.Screen 
        name="PassengerDetails"
        component={withHideTabBar(PassengerDetailsScreen)}
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
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          headerShown: true,
          title: 'Summary',
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
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: true,
          title: 'Make Payment',
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

// Higher-order component to hide tab bar
const withHideTabBar = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    useFocusEffect(
      React.useCallback(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
          parentNavigation.setOptions({
            tabBarStyle: { display: 'none' }
          });
        }
        return () => {
          if (parentNavigation) {
            parentNavigation.setOptions({
              tabBarStyle: { display: 'flex', height: 80 },
            });
          }
        };
      }, [navigation])
    );

    return <WrappedComponent {...props} />;
  };
};

export default TicketsStack;
