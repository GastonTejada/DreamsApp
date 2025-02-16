import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { FontAwesome6 } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const Header = ({route}) => {
  
//   const categorySelected = useSelector(state => state.shop.value.categorySelected)
  
  return (
     <View style={styles.container}>
          <View style={styles.logoContainer}>
              <Image
                  source={require('../../assets/images/logo.webp')}
                  style={styles.logo}
              />      
          </View>    
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: '100%',
    height: 45,
    backgroundColor: '#520120',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,    
  },
  logo:{
    width: 100,
    height: 20,
    marginLeft: 8,    
    justifyContent: 'center',
    color: '#fff',  
  },
  logoContainer: {      
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',              
  },
  text: {    
    color: colors.white,
    fontSize: 15,    
    marginLeft: 5,
    fontWeight: 'bold',
  }
})