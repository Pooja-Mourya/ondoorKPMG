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
  const [logout, setLogout] = useState(true);
  const [loader, setLoader] = useState(false);
  const token = useSelector(state => state?.user?.user?.access_token);

  const submitHandle = async () => {
    const url = constants.endPoint.logout;
    const params = {};
    // return;
    try {
      setLoader(true);
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result);

      AsyncStorage.removeItem('@user');
      setLoader(false);
      navigation.navigate('AuthMain');
    } catch (error) {
      console.log('error', error);
    }
  };

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
          label={'LOGOUT'}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            margin: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
            padding: SIZES.padding,
          }}
          onPress={() => submitHandle()}
        />
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
