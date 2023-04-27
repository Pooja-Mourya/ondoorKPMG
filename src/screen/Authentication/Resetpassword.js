import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/layout/Header';
import FormInput from '../../components/FormInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import TextButton from '../../components/TextButton';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import ApiMethod from '../../Services/APIService';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const Resetpassword = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [load, setLoad] = useState(false);
  const [otpState, setOtpState] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
  });
  const [verifyState, setVerifyState] = useState(false);

  const MakeNewPassword = async () => {
    const url = constants.endPoint.changePassword;
    const params = {
      old_password: password.token,
      password: newPassword,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);
      if (result) {
        Alert.alert('user added successfully');
        navigation.navigate('User');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const onChangeOtp = (name, value) => {
    setOtpState({
      ...otpState,
      [name]: value,
    });
  };

  if (load === true) return <ActivityIndicator />;
  return (
    <>
      <Header leftIcon={true} rightIcon={true} textHeader={'Reset Password'} />

      <View
        style={{
          backgroundColor: COLORS.support5_08,
          padding: SIZES.padding,
          justifyContent: 'space-around',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View
          style={{
            margin: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TextInput
            style={{
              width: '15%',
              borderRadius: SIZES.radius,
              borderColor: COLORS.light,
              backgroundColor: COLORS.light,
              borderWidth: 1,
              elevation: 2,
              fontSize: SIZES.h2,
              textAlign: 'center',
            }}
            placeholder={'0'}
            value={otpState.one}
            onChangeText={o => onChangeOtp('one', o)}
          />
          <TextInput
            style={{
              width: '15%',
              borderRadius: SIZES.radius,
              borderColor: COLORS.light,
              backgroundColor: COLORS.light,
              borderWidth: 1,
              elevation: 2,
              fontSize: SIZES.h2,
              textAlign: 'center',
            }}
            placeholder={'0'}
            value={otpState.two}
            onChangeText={t => onChangeOtp('two', t)}
          />
          <TextInput
            style={{
              width: '15%',
              borderRadius: SIZES.radius,
              borderColor: COLORS.light,
              backgroundColor: COLORS.light,
              borderWidth: 1,
              elevation: 2,
              fontSize: SIZES.h2,
              textAlign: 'center',
            }}
            placeholder={'0'}
            value={otpState.three}
            onChangeText={t => onChangeOtp('three', t)}
          />
          <TextInput
            style={{
              width: '15%',
              borderRadius: SIZES.radius,
              borderColor: COLORS.light,
              backgroundColor: COLORS.light,
              borderWidth: 1,
              elevation: 2,
              fontSize: SIZES.h2,
              textAlign: 'center',
            }}
            placeholder={'0'}
            value={otpState.four}
            onChangeText={f => onChangeOtp('four', f)}
          />
          <TextButton
            label={!verifyState ? 'Verify' : '✔️'}
            contentContainerStyle={{
              padding: 12,
              //   borderRadius: SIZES.radius,
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h4,
            }}
            onPress={() => {
              if (otpState == null) {
                Alert.alert('otp');
              }
              setVerifyState(!verifyState);
              setOtpState('');
            }}
          />
          {/* <Button title="verify"  /> */}
        </View>

        {verifyState == true ? (
          <View>
            <FormInput
              placeholder={'password'}
              onChange={p => setPassword(p)}
              value={password}
              secureTextEntry={true}
              prependComponent={
                <AntDesign name={'lock'} size={30} color={COLORS.grey} />
              }
            />
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                marginTop: 10,
              }}
              placeholder={'Confirm password'}
              onChange={p => setNewPassword(p)}
              value={newPassword}
              secureTextEntry={true}
              prependComponent={
                <AntDesign name={'lock'} size={30} color={COLORS.grey} />
              }
            />
            <TextButton
              label={'Create New Password'}
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                marginVertical: 10,
              }}
              labelStyle={{
                color: COLORS.light,
                ...FONTS.h4,
              }}
              onPress={() => MakeNewPassword()}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({});
