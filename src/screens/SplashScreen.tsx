import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const SplashScreen: FC = () => {
  return (
    <View style={styles.splash}>
      <Text style={styles.splashText}>LOADING...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6750a4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    alignContent: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Courier',
  },
});
