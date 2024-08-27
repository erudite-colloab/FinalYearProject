import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AppNavigator from "./AppNavigator"
import MainNavigator from "./MainNavigator"
import AuthStack from "./AuthStack"
import { View, Text } from "react-native";

export const Navigation = () => {
    const {isAuthorized, isAuthorizeda} = useContext(AuthContext)

    switch (isAuthorizeda) {
        case "authenticated":
           return <MainNavigator />; 
        case "unauthenticated":
            return <AuthStack />
        default:
            <View style={{ flex: 1 , alignItems: "center", justifyContent: "center", backgroundColor: "#aaf"}}>
                <Text>isLoading</Text>
            </View>
    }

    // return isAuthorized ? <MainNavigator /> : <AuthStack />
}