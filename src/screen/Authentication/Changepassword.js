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

const Changepassword = ({setChnagePasswordModal, changePasswordModal}) => {
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
        setChnagePasswordModal(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => setChnagePasswordModal(false)}
      >
        <AntDesign
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            elevation: 2,
            margin: 10,
            padding: 5,
          }}
          name="close"
          size={25}
          color={COLORS.dark}
        />
      </TouchableOpacity>

      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="old password"
        value={old_password}
        onChange={e => setOld_password(e)}
        prependComponent={<Fontisto name="eye" size={25} color={COLORS.grey} />}
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
        prependComponent={<Fontisto name="eye" size={25} color={COLORS.grey} />}
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
  );
};

export default Changepassword;

const styles = StyleSheet.create({});
