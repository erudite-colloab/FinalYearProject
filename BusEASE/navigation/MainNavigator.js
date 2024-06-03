import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons }  from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import TicketsStack from "../navigation/TicketsStack";
import TripsStack from "../navigation/TripsStack";
import SettingsStack from "../navigation/SettingsStack";



const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
        <Tab.Navigator           
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if ( route.name === 'Home' ){
                iconName = focused ? 'home' : 'home-outline';
              }else if ( route.name === 'Tickets'){
                iconName = focused ? 'list' : 'list-outline' ;            
              }else if ( route.name === 'Trips') {
                iconName = focused ? 'bus' : 'bus-outline' ;
              }else if ( route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline' ;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor : 'tomato',
          tabBarInactiveTintColor : 'gray',
          tabBarStyle: {
            position: 'absolute',
            height: 60,
            //borderRadius: 10,
            //right: 10,
            //left: 10,
           
          }
          })} 
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Tickets" component={TicketsStack} />
          <Tab.Screen name="Trips" component={TripsStack} />
          <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
  );
};