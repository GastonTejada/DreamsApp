import { StyleSheet, Image, View, Animated, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            source={require('../../assets/images/logo.webp')}
            style={styles.logo}
        />    
      </View>
      <Image 
        source={require('../../assets/images/ayj.png')}
        style={styles.bottomRightImage}
      />              
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.textLoader}>Obteniendo servicios...</Text>
      </View>
    </View>
  );

}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '65%',    
  },
  bottomRightImage: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  loaderContainer: {
    marginTop: 40,
  },
  textLoader: {
    color: colors.dark,
    fontSize: 18,
  },
});
