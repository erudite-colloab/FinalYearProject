import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AppNavigator from "./AppNavigator"
import MainNavigator from "./MainNavigator"
import AuthStack from "./AuthStack"

export const Navigation = () => {
    const {isAuthorized} = useContext(AuthContext)
    return isAuthorized ? <MainNavigator /> : <AuthStack />
}