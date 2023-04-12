import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextButton from '../../components/TextButton';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FormInput from '../../components/FormInput';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import ApiMethod from '../../Services/APIService';
import {useSelector} from 'react-redux';
import Header from '../../components/layout/Header';

const Changepassword = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const [old_password, setOld_password] = useState('');
  const [password, setPassword] = useState('');

  const updatePasswordHandler = async () => {
    const url = constants.endPoint.updatePassword;
    const params = {
      //   old_password: '12345678',
      //   password: '12345678',
      password,
      token,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);

      console.log('updatePassword', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const chnagePasswordHandler = async () => {
    const url = constants.endPoint.changePassword;
    const params = {
      //   old_password: '12345678',
      //   password: '12345678',
      old_password,
      password,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);

      console.log('chnagePassword', result);
      if (result) {
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey80,
      }}
    >
      <View
        style={{
          width: '90%',
          backgroundColor: COLORS.secondary,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
        }}
      >
        <Header
          textHeader={'Change Password'}
          leftIcon={true}
          onPressArrow={() => navigation.goBack()}
        />

        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="old password"
          value={old_password}
          onChange={e => setOld_password(e)}
          prependComponent={
            <Fontisto name="eye" size={25} color={COLORS.grey} />
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="password"
          value={password}
          onChange={e => setPassword(e)}
          prependComponent={
            <Fontisto name="eye" size={25} color={COLORS.grey} />
          }
        />
        <TextButton
          label={'Submit'}
          contentContainerStyle={{
            height: 55,
            borderRadius: SIZES.radius,
            marginTop: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
          }}
          onPress={() => {
            chnagePasswordHandler();
          }}
        />
      </View>
    </View>
  );
};

export default Changepassword;

const styles = StyleSheet.create({});
