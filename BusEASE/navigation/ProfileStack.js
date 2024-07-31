import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import VerifyPhoneScreen from "../screens/VerifyPhoneScreen";
import OTPverification from "../screens/OTPverification";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: {
            backgroundColor: "#1E60ED",
            height: 100,
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={withHideTabBar(EditProfileScreen)}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyPhone"
        component={withHideTabBar(VerifyPhoneScreen)}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={withHideTabBar(EmailVerificationScreen)}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );

};

const withHideTabBar = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    useFocusEffect(
      React.useCallback(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
          parentNavigation.setOptions({
            tabBarStyle: { display: "none" },
          });
        }
        return () => {
          if (parentNavigation) {
            parentNavigation.setOptions({
              tabBarStyle: { display: "flex", height: 80 },
            });
          }
        };
      }, [navigation])
    );

    return <WrappedComponent {...props} />;
  };
};

export default ProfileStack;
