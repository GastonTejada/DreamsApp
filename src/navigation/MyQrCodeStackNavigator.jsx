import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MyQrCode from "../screens/MyQrCode"

const Stack = createNativeStackNavigator()

const MyQrCodeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Init"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen component={MyQrCode}  name="Init" />
        </Stack.Navigator>
    )
}

export default MyQrCodeStackNavigator
