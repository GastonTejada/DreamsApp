import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState , useEffect} from 'react'
import SplashScreen from '../components/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import AuthStackNavigator from './AuthStackNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import HomeStackNavigator from './HomeStackNavigator'
import { useSelector, useDispatch } from 'react-redux'
import { getSession } from '../persistence'
import { setUser } from '../features/User/userSlice'
import SingUpScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import MyProfileStackNavigator from './MyProfileStackNavigator';

const Navigator = () => {

  const [loading, setLoading] = useState(true);
  const {user} = useSelector(state => state.auth.value)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  // useEffect(()=> {
  //   (async ()=> {
  //       try {
  //           const response = await getSession()

  //           console.log(response);          
  //           if (response.rows._array.length) {
  //             const user = response.rows._array[0]
  //             dispatch(setUser({
  //               email: user.email,
  //               localId: user.localId,
  //               idToken: user.token
  //             }))
  //           }
  //       } catch (error) {
  //           Alert.alert('Error', 'Hubo un problema al iniciar sesión, inténtelo nuevamente más tarde.');                
  //       }
  //   })()
  // }, [])

  return (
    <NavigationContainer>      
        {/* {loading ? <SplashScreen /> : <AuthStackNavigator/> } */}
        {/* <SplashScreen /> */}
        {/* <AuthStackNavigator/> */}
        {loading ? <SplashScreen /> : user ? <BottomTabNavigator/> : <AuthStackNavigator/> }
        {/* <HomeStackNavigator /> */}        
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})