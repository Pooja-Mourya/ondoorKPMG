import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoaderFile = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={require('../assets/loader.json')}
        autoPlay
        loop
        style={{
          width: '100%',
        }}
      />
    </View>
  );
};

export default LoaderFile;

const styles = StyleSheet.create({});
