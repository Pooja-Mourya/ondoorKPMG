import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import ApiMethod from '../../Services/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {Modal} from 'react-native';
import TextButton from '../../components/TextButton';
import {useSelector} from 'react-redux';

const Logout = () => {
  if (loader) return <ActivityIndicator />;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={logout}
      onRequestClose={() => {
        setLogout(!logout);
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: COLORS.support1,
        }}
      >
        <TextButton
          label={'CANCEL'}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            margin: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
            padding: SIZES.padding,
          }}
          onPress={() => setLogout(false)}
        />
      </View>
    </Modal>
  );
};

export default Logout;

const styles = StyleSheet.create({});
