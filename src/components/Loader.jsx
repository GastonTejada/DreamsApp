import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text , Image} from 'react-native';
import { colors } from '../constants/colors';

const Loader = () => {
  return (        
      <View style={styles.loaderContainer}>

          <View style={styles.logoContainer}>
              <Image
                  source={require('../../assets/images/logo.webp')}
                  style={styles.logo}
                  />      
          </View>      

          <ActivityIndicator size="large" color='#FF204E' />
          <Text style={styles.textLoader}>Loading...</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%'
  },
  logoContainer: {      
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',              
  },
  logo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%', 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  textLoader:{
    color: colors.dark,
    fontSize: 18,
  },
});

export default Loader;