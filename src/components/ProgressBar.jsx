import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { colors } from '../constants/colors';

const ProgressBarComponent = ({ progress }) => {
  return (
      <View style={styles.loaderContainer}>
        <ProgressBar 
          progress={progress} 
          width={200} 
          color='#520120'
          borderWidth={2} 
          borderColor={colors.white}
        />
        <Text style={styles.textLoader}>Loading... {Math.round(progress * 100)}%</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  textLoader: {
    color: colors.white,
    fontSize: 18,
    marginTop: 10,
  },
});

export default ProgressBarComponent;
