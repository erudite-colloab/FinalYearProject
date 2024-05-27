import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
        <Stack.Navigator 
          initialRouteName="Home" 
          //screenOptions={{headerShown:false}} 
        >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown:true }}
            />

        </Stack.Navigator>
   
  )
}