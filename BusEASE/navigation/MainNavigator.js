import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import TicketsStack from "../navigation/TicketsStack";
import TripsStack from "../navigation/TripsStack";
import ProfileStack from "../navigation/ProfileStack";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Trips') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E60ED',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          height: 80,
          display: "flex",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsStack}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsStack}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
}
