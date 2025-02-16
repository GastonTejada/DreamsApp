import React from "react"
import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from "./HomeStackNavigator"
import MyProfileStack from "./MyProfileStackNavigator"
import { colors } from "../constants/colors"
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5,FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false , 
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>                                
                                <SimpleLineIcons name="home" size={24} color={focused ? colors.orangeDreams : "gray" } />
                                {focused && <View style={styles.tabBarIndicator} />}
                            </View>
                        )
                    },
                }}
                
            />
            <Tab.Screen 
                name="My profile"
                component={MyProfileStack}
                options={{
                    headerShown: false , 
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>                                
                                <FontAwesome5 name="user-astronaut" size={24} color={ focused ? colors.orangeDreams : "gray"} />
                                {focused && <View style={styles.tabBarIndicator} />}
                            </View>
                        )
                    },
                }}
            />   

        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "black",
        shadowColor: colors.orangeDreams,
        elevation: 4,        
        height: 50,        
    },
    tabBarIndicator: {
        position: 'absolute',
        bottom: -10,
        width: '100%',
        height: 3,
        backgroundColor: colors.orangeDreams,
    },

})

