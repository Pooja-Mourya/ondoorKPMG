import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import {COLORS, SIZES, FONTS, constants} from '../../constants';
import TextButton from '../../components/TextButton';
import ApiMethod from '../../Services/APIService';
import {useDispatch} from 'react-redux';
import {userLoginFun} from '../../redux/slice/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import LoaderFile from '../LoaderFile';
import {CommonActions} from '@react-navigation/native';
import CheckBox from '../../components/CheckBox';
import {
  CountdownCircleTimer,
  useCountdown,
  counterclockwise,
} from 'react-native-countdown-circle-timer';
import Changepassword from './Changepassword';
import axios from 'axios';
import {Root, Popup, Toast} from 'popup-ui';
import {ToastAndroid} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {useCustomHook} from '../theme/ThemeContext';

const AuthMain = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const {dark} = useCustomHook();

  //   console.log('token', token);
  const [changeModal, setChangeModal] = useState(false);
  const [enableCheck, setEnableCheck] = useState('');
  const [mode, setMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [errors, setErrors] = useState(false);
  const [click, setClick] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [forgetPassword, setForgetPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [loginOtpModal, setLoginOtpModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [logged, setLogged] = useState(false);
  const [otpState, setOtpState] = useState('');

  const handleEmailCheck = e => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmail(e);
    if (reg.test(e)) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  const dispatch = useDispatch();

  const submitHandle = async () => {
    await axios
      .post(`https://meeting-api.gofactz.com/public/api/login`, {
        email,
        password,
        logout_from_all_devices: enableCheck && 'yes',
      })
      .then(res => {
        console.log(res);
        // Alert.alert(res.data.message);
        ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
        setPassword('');
        setEnableCheck('');
        setOtpState('');
        if (res.data.message) {
          setLoginOtpModal(true);
        }
        setLoader(false);
      })
      .catch(error => {
        console.log(' 4', error.response.data.message);
        if (error.response.data.message) {
          //   Alert.alert('login error response', `${error.response.data.message}`);
          //   Popup.show({
          //     title: 'login error code',
          //     textBody: ,
          //     type: 'Warning',
          //     buttonText: 'Ok',
          //     callback: () => Popup.hide(),
          //   });
          ToastAndroid.show(
            `${error.response.data.message}`,
            ToastAndroid.SHORT,
          );
          setLogged(error.response.data.message);
        }
        setLoader(false);
      });
  };
  const HandleSignUp = async () => {
    const url = constants.endPoint.registerForm;
    const params = {
      role_id: '2',
      name: name,
      email: email,
      password: password,
      'confirm-password': confirmPassword,
      mobile_number: number,
      designation: designation,
    };
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result, 'param', params);
    } catch (error) {
      console.log('error', error);
    }
  };

  const resetPassword = async () => {
    try {
      const url = constants.endPoint.forgetPassword;
      const params = {
        email: forgetPassword,
        // email: 'admin@gmail.com',
      };

      // return
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result);
      if (result) {
        // result.message;
        Alert.alert(
          'Password reset link send to your email address, please check your mail',
        );
        navigation.navigate('Resetpassword');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  async function myFunction() {
    setLoader(true);
    try {
      const variable = await AsyncStorage.getItem('@user');
      console.log('variable***', variable);
      if (!variable) {
        AsyncStorage.removeItem('@user');
        navigation.navigate('AuthMain');
      } else {
        navigation.dispatch({
          ...CommonActions.reset({
            index: 0,
            routes: [{name: 'MyTab'}],
          }),
        });
        setLoader(false);
      }
    } catch (error) {
      console.log('AppError', error);
    }
  }

  useEffect(() => {
    myFunction();
  }, [token]);

  const verifyOtp = async () => {
    setLoader(true);
    let url = constants.endPoint.verifyOtp;
    let params = {
      email,
      otp: otpState,
    };

    const otpResult = await ApiMethod.postData(url, params, null);
    if (otpResult) {
      ToastAndroid.show(`${otpResult.data.message}`, ToastAndroid.SHORT);
      AsyncStorage.setItem('@user', otpResult.data.data.access_token);
      dispatch(userLoginFun(otpResult?.data.data));
      setLoader(false);
      setLoginOtpModal(false);
      setEmail('');
      navigation.navigate('MyTab');
    } else {
      Popup.show({
        type: 'Warning',
        title: 'warning correct otp',
        textBody: 'Unauthenticated',
        buttonText: 'Ok',
        callback: () => Popup.hide(),
      });
      AsyncStorage.removeItem('@user');
    }
    setLoader(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoginOtpModal(false);
      setOtpState('');
    }, 180000);
  }, [loginOtpModal]);

  function SignInFunction() {
    return (
      <KeyboardAwareScrollView>
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        >
          <View style={styles.authContainer}>
            <Text
              style={{
                width: '60%',
                //   lineHeight: 5,
                color: COLORS.dark,
                ...FONTS.dark,
                fontSize: SIZES.h1,
                paddingHorizontal: 10,
                marginBottom: 20,
                marginVertical: 20,
              }}
            >
              Sign in to continue !...
            </Text>

            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
              }}
              placeholder="Email"
              value={email}
              onChange={e => handleEmailCheck(e)}
              onFocus={() => setCheck()}
              prependComponent={
                <Image
                  source={require('../../assets/icons/email.png')}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: SIZES.base,
                  }}
                />
              }
            />
            {check ? (
              <Text style={{color: COLORS.error}}>invalid email formate</Text>
            ) : (
              <Text></Text>
            )}

            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
              }}
              placeholder="Password"
              secureTextEntry={!click}
              value={password}
              onChange={text => setPassword(text)}
              onFocus={t => setErrors(t)}
              error={errors}
              //   maxLength={8}
              prependComponent={
                <Image
                  source={require('../../assets/icons/lock.png')}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: SIZES.base,
                  }}
                />
              }
              appendComponent={
                <TouchableOpacity onPress={() => setClick(!click)}>
                  <Image
                    source={
                      click
                        ? require('../../assets/icons/eye.png')
                        : require('../../assets/icons/eye-off.png')
                    }
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 25,
                    }}
                  />
                </TouchableOpacity>
              }
            />
            {errors ? (
              <Text style={{color: COLORS.error}}>please enter password</Text>
            ) : (
              <Text></Text>
            )}
            <View style={{marginHorizontal: 12}}>
              {logged && (
                <CheckBox
                  CheckBoxText={'logout from all devices'}
                  containerStyle={{backgroundColor: '', lineHeight: 20}}
                  isSelected={enableCheck}
                  onPress={() => {
                    setEnableCheck(!enableCheck);
                  }}
                />
              )}
            </View>

            <View style={{alignItems: 'flex-end'}}>
              <TextButton
                label={'Forgot password'}
                contentContainerStyle={{
                  marginTop: SIZES.radius,
                  backgroundColor: 'null',
                }}
                labelStyle={{
                  color: COLORS.support1,
                  ...FONTS.h4,
                  paddingHorizontal: SIZES.padding,
                }}
                onPress={() => setForgetModal(true)}
              />
            </View>
            <TextButton
              label={
                !loader ? <ActivityIndicator color={COLORS.light} /> : 'Log In'
              }
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                // margin: 10,
                width: '95%',
              }}
              labelStyle={{
                color: COLORS.light,
                ...FONTS.h4,
              }}
              onPress={() => {
                setLoader(false);
                var passW = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                //   if (password.match(passW) && email) {

                if (email) {
                  submitHandle();
                } else {
                  Alert.alert(
                    'validation failed',
                    'Password must be at least 8 characters and contain at least 1 uppercase character, 1 number, and 1 special character',
                    [
                      ({text: 'ok', onPress: () => {}},
                      {
                        text: '',
                      }),
                    ],
                  );
                }
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  function SignUpFunction() {
    return (
      <KeyboardAwareScrollView>
        <Text
          style={{
            width: '60%',
            lineHeight: 45,
            color: COLORS.dark,
            ...FONTS.dark,
            fontSize: SIZES.h1,
            paddingHorizontal: 10,
          }}
        >
          Sign up
        </Text>

        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Name"
          value={name}
          onChange={() => setName()}
          error={errors}
          onFocus={() => setErrors()}
          prependComponent={
            <Image
              source={require('../../assets/icons/person.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.base,
              }}
            />
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e)}
          error={errors}
          onFocus={() => setErrors()}
          prependComponent={
            <Image
              source={require('../../assets/icons/email.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.base,
              }}
            />
          }
        />

        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Number"
          value={number}
          onChange={u => setNumber(u)}
          error={errors}
          onFocus={() => setErrors()}
          prependComponent={
            <Entypo
              style={{marginHorizontal: 5}}
              name="old-phone"
              size={22}
              color={COLORS.grey}
            />
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChange={p => setPassword(p)}
          error={errors}
          onFocus={() => setErrors()}
          prependComponent={
            <Image
              source={require('../../assets/icons/lock.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.base,
              }}
            />
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Confirm Password"
          secureTextEntry={!click}
          value={confirmPassword}
          onChange={p => setConfirmPassword(p)}
          error={errors}
          onFocus={() => setErrors()}
          prependComponent={
            <Image
              source={require('../../assets/icons/lock.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.base,
              }}
            />
          }
          appendComponent={
            <TouchableOpacity onPress={() => setClick(!click)}>
              <Image
                source={
                  !click
                    ? require('../../assets/icons/eye-off.png')
                    : require('../../assets/icons/eye.png')
                }
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            </TouchableOpacity>
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Designation"
          value={designation}
          onChange={d => setDesignation(d)}
          error={errors}
          onFocus={() => setErrors()}
          prependComponent={
            <MaterialIcons
              style={{marginHorizontal: 5}}
              name={'design-services'}
              size={24}
              color={COLORS.grey}
            />
          }
        />
        <TextButton
          label={'Sign Up'}
          contentContainerStyle={{
            height: 55,
            borderRadius: SIZES.radius,
            margin: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
          }}
          onPress={() => {
            if ((email, password, confirmPassword, name, number, designation)) {
              HandleSignUp();
              Alert.alert('locally form submitted');
            } else {
              Alert.alert('validation failed');
            }
          }}
        />
      </KeyboardAwareScrollView>
    );
  }

  const AuthContainer = () => {
    if (mode) {
      return SignUpFunction();
    } else {
      return SignInFunction();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: dark ? COLORS.lightGrey : COLORS.dark,
      }}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
          width: 50,
          height: 50,
        }}
      />

      <KeyboardAwareScrollView>
        <View style={styles.authContainer}>{AuthContainer()}</View>
      </KeyboardAwareScrollView>

      <View
        style={{
          alignItems: 'flex-start',
          position: 'absolute',
          marginTop: 500,
          marginHorizontal: 16,
        }}
      >
        <TextButton
          label={
            mode == false
              ? 'new user registration'
              : 'if you are already register so login '
          }
          contentContainerStyle={{
            marginTop: 80,
            backgroundColor: !dark ? COLORS.light : COLORS.primary,
            borderRadius: SIZES.radius,
            padding: 10,
          }}
          labelStyle={{
            color: COLORS.support1,
            ...FONTS.h4,
            paddingHorizontal: SIZES.padding,
          }}
          onPress={() => {
            mode == false ? setMode(true) : setMode(false);
          }}
        />
      </View>
      {/* {mode == true ? (
        <TouchableOpacity
          onPress={() => setMode(false)}
          style={{
            marginBottom: 15,
            alignSelf: 'center',
            backgroundColor: !dark ? COLORS.light : COLORS.support3_08,
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
          }}
        >
          <Text>if you are already register so login </Text>
        </TouchableOpacity>
      ) : // <AntDesign name="user" color="blue" size={130} />
      null} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={forgetModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setForgetModal(!forgetModal);
        }}
      >
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
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <View
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: COLORS.light20,
                  borderRadius: 50,
                  padding: 5,
                  elevation: 1,
                }}
                onPress={() => setForgetModal(false)}
              >
                <Text>
                  <AntDesign name="close" size={30} color={COLORS.dark} />
                </Text>
              </TouchableOpacity>

              <Text style={{fontSize: SIZES.h2, padding: 10}}>
                reset password
              </Text>
            </View>
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
              }}
              placeholder="ENTER YOUR EMAIL"
              value={forgetPassword}
              onChange={f => setForgetPassword(f)}
            />
            <TextButton
              label={'Reset Password'}
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                marginVertical: 10,
              }}
              labelStyle={{
                color: COLORS.light,
                ...FONTS.h4,
              }}
              onPress={() => resetPassword()}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={loginOtpModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setLoginOtpModal(!loginOtpModal);
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: 20,
              backgroundColor: COLORS.light,
              borderRadius: SIZES.radius,
              borderWidth: 5,
              borderColor: COLORS.secondary,
            }}
          >
            <View style={{margin: 20, alignItems: 'center'}}>
              <CountdownCircleTimer
                isPlaying
                duration={180}
                colors={[
                  '#004777',
                  '#F7B801',
                  '#A30000',
                  '#A30000',
                  '#004777',
                  '#F7B801',
                  '#A30000',
                ]}
                rotation={counterclockwise}
                counterclockwise={true}
                colorsTime={[60, 50, 40, 30, 20, 10, 0]}
                size={150}
                strokeWidth={2}
              >
                {({remainingTime}) => {
                  remainingTime;
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{...FONTS.font1}}>you can login</Text>
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 20,
                          fontWeight: '700',
                          padding: 8,
                        }}
                      >
                        {remainingTime}
                      </Text>
                      <Text>Seconds</Text>
                    </View>
                  );
                }}
              </CountdownCircleTimer>
            </View>

            <Text
              style={{
                color: COLORS.error,
                fontSize: 18,
                textAlign: 'center',
                paddingVertical: 25,
              }}
            >
              otp time 3 minutes
            </Text>
            <TextButton
              label={'Resend OTP'}
              contentContainerStyle={{
                marginTop: 15,
                backgroundColor: COLORS.grey,
                // elevation: 1,
                marginHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                borderRadius: SIZES.radius,
              }}
              labelStyle={{
                color: COLORS.dark,
                ...FONTS.h4,
                //   paddingHorizontal: SIZES.padding,
              }}
              onPress={() => {
                setLoginOtpModal(false);
                submitHandle();
                setOtpState('');
              }}
            />
            <View
              style={{
                margin: SIZES.padding,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '80%',
              }}
            >
              <OtpInputs
                inputStyles={{
                  width: '100%',
                  borderRadius: SIZES.radius,
                  borderColor: COLORS.grey,
                  backgroundColor: COLORS.light20,
                  borderWidth: 1,
                  fontSize: SIZES.h2,
                  textAlign: 'center',
                  paddingHorizontal: 12,
                }}
                handleChange={code => setOtpState(code)}
                numberOfInputs={6}
              />
            </View>

            <TextButton
              label={
                <View style={{marginTop: 20}}>
                  {loader ? (
                    <ActivityIndicator color={COLORS.dark} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius,
                        padding: 12,
                        color: COLORS.light,
                      }}
                      // onPress={() => show()}
                    >
                      Verify OTP...
                      <Feather
                        name="arrow-right"
                        size={20}
                        color={COLORS.light}
                      />
                    </Text>
                  )}
                </View>
              }
              contentContainerStyle={{
                marginTop: 15,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.dark,
                ...FONTS.h4,
                margin: 15,
              }}
              onPress={() => {
                if ({...otpState}) {
                  setTimeout(() => {
                    verifyOtp();
                  }, 1000);
                }
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changeModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setChangeModal(!changeModal);
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: 20,
              backgroundColor: COLORS.light,
              borderRadius: SIZES.radius,
              borderWidth: 5,
              borderColor: COLORS.secondary,
            }}
          >
            <Changepassword setChangeModal={setChangeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AuthMain;

const styles = StyleSheet.create({
  authContainer: {
    // flex: 2,
    // width: SIZES.width - SIZES.padding * 2,

    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
    marginTop: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
