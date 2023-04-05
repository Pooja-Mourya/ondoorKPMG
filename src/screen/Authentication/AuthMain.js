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

import React, {useEffect, useState} from 'react';
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
import Toast from 'react-native-toast-message';
import Changepassword from './Changepassword';

const AuthMain = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  //   console.log('token', token);

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
  const [load, setLoad] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [forgetPassword, setForgetPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [loginOtpModal, setLoginOtpModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [logged, setLogged] = useState(false);
  const [timer, setTimer] = useState('');
  const [popModal, setPopModal] = useState(false);
  const [otpState, setOtpState] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
  });

  const handleEmailCheck = e => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmail(e);
    if (reg.test(e)) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  const onChangeOtp = (name, value) => {
    setOtpState({
      ...otpState,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const submitHandle = async () => {
    const url = constants.endPoint.login;
    const params = {
      email,
      password,
      //   logout_from_all_devices: enableCheck === true && 'yes',
      logout_from_all_devices: 'yes',
    };
    await ApiMethod.postData(url, params, null)
      .then(function (res) {
        console.log('login result', res.data.message);
        // setEmail('');
        setPassword('');
        setEnableCheck('');
        setOtpState('');
        if (res.data.message) {
          setLoginOtpModal(true);
        }
      })
      .catch(function (error) {
        if (error) {
          setLogged(error.response?.data?.data?.is_logged_in);
          Alert.alert(
            `something went wrong`,
            `${error.response?.data?.message}`,

            [{text: 'ok'}],
          );
          console.log('error*', error.message);
        }
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

      //   role_id: '2',
      //   name: 'user8',
      //   email: 'user8@gmail.com',
      //   password: '12345678',
      //   'confirm-password': '12345678',
      //   mobile_number: '8103099592',
      //   designation: 'project Manager',
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
    let url = constants.endPoint.verifyOtp;
    let params = {
      email,
      //   otp:
      //     otpState.one +
      //     otpState.two +
      //     otpState.three +
      //     otpState.four +
      //     otpState.five +
      //     otpState.six,
      otp: '963852',
    };
    try {
      const otpResult = await ApiMethod.postData(url, params, null);
      console.log('otpResult', otpResult.data.data);
      if (otpResult) {
        Alert.alert(`${otpResult.data.message}`);
        AsyncStorage.setItem('@user', otpResult.data.data.access_token);
        dispatch(userLoginFun(otpResult?.data.data));
        setLoad(false);
        setLoginOtpModal(false);
        setEmail('');
        navigation.navigate('MyTab');
      }
    } catch (error) {
      Alert.alert('enter correct otp', 'Unauthenticated');
      console.log('error', error);
      AsyncStorage.removeItem('@user');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoginOtpModal(false);
      setOtpState('');
    }, 30000);
  }, []);

  // useEffect(() => {
  //   if (verifyOtp()) {
  //     setTimeout(() => {
  //       <View style={{backgroundColor: COLORS.light}}>
  //         <Changepassword />
  //         <Text>up</Text>
  //       </View>;
  //     }, 1000);
  //   }
  // }, []);

  function SignInFunction() {
    if (load)
      return (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        />
      );
    return (
      <View style={{marginTop: SIZES.padding, height: SIZES.height / 2}}>
        <View style={styles.authContainer}>
          {/* {!logged && (
            <Text
              style={{
                ...FONTS.font1,
                color: COLORS.error,
                backgroundColor: COLORS.support4_08,
                fontWeight: '500',
                borderRadius: SIZES.radius,
                margin: 10,
                passing: 10,
              }}
            >
              Too many fail login attempt your ip has restricted for 15 minutes.
            </Text>
          )} */}
          <Text
            style={{
              width: '60%',
              lineHeight: 45,
              color: COLORS.dark,
              ...FONTS.dark,
              fontSize: SIZES.h1,
              paddingHorizontal: 10,
              marginBottom: 30,
            }}
          >
            Sign in to continue
          </Text>
          <KeyboardAwareScrollView
          // enableOnAndroid={true}
          // keyboardDismissMode="on-drag"
          // keyboardShouldPersistTaps={'handled'}
          // extraScrollHeight={-300}
          // contentContainerStyle={{
          //   flexGrow: 1,
          //   justifyContent: 'center',
          // }}
          >
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
                !loginOtpModal ? (
                  'Log In'
                ) : (
                  <ActivityIndicator color={COLORS.light} />
                )
              }
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
                var passW = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                //   if (password.match(passW) && email) {
                if (email) {
                  //   setLoginOtpModal(true);
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
                // navigation.navigate('MyTab');
              }}

              //   onPress={() => submitHandle()}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }

  function SignUpFunction() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.authContainer}>
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
              if (
                (email, password, confirmPassword, name, number, designation)
              ) {
                HandleSignUp();
                Alert.alert('locally form submitted');
              } else {
                Alert.alert('validation failed');
              }
            }}
          />
        </View>
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

  //   if (loader || !token) return <LoaderFile />;

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightGrey,
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

      <View style={styles.authContainer}>{AuthContainer()}</View>

      <View
        style={{
          alignItems: 'flex-start',
          position: 'absolute',
          marginTop: 500,
          marginHorizontal: 16,
        }}
      >
        <TextButton
          label={mode == false ? 'new user registration' : null}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            backgroundColor: 'null',
            // fontSize: 35,
          }}
          labelStyle={{
            color: COLORS.support1,
            ...FONTS.h4,
            paddingHorizontal: SIZES.padding,
          }}
          onPress={() => {
            setMode(true);
          }}
        />
      </View>
      {mode == false ? (
        <View style={{flex: 2, marginTop: 400, alignItems: 'center'}}>
          <Text style={{fontWeight: '700', ...FONTS.font1}}>OR login with</Text>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={COLORS.primary}
              style={{
                borderRadius: SIZES.radius,
                padding: 10,
              }}
              onPress={() => {}}
            >
              <Image
                source={require('../../assets/icons/google.png')}
                style={{width: 40, height: 40, marginHorizontal: 10}}
              />
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={COLORS.primary}
              style={{
                borderRadius: SIZES.radius,
                padding: 10,
              }}
              onPress={() => {}}
            >
              <Image
                source={require('../../assets/icons/twitter.png')}
                style={{width: 40, height: 40, marginHorizontal: 10}}
              />
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={COLORS.primary}
              style={{
                borderRadius: SIZES.radius,
                padding: 10,
              }}
              onPress={() => {}}
            >
              <Image
                source={require('../../assets/icons/linkedin.png')}
                style={{width: 40, height: 40, marginHorizontal: 10}}
              />
            </TouchableHighlight>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setMode(false)}
          style={{
            marginBottom: 20,
            alignSelf: 'center',
            backgroundColor: COLORS.support3_08,
            padding: SIZES.padding,
          }}
        >
          <Text>if you are already register so login </Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={forgetModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
              >
                {({remainingTime}) => {
                  //   console.log('remainingTime', remainingTime);
                  setTimer(remainingTime);
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
              label={
                !load ? (
                  'Resend OTP'
                ) : (
                  <ActivityIndicator size={'large'} color={'white'} />
                )
              }
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
                maxLength={1}
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
                maxLength={1}
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
                maxLength={1}
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
                maxLength={1}
                placeholder={'0'}
                value={otpState.four}
                onChangeText={f => onChangeOtp('four', f)}
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
                maxLength={1}
                placeholder={'0'}
                value={otpState.five}
                onChangeText={f => onChangeOtp('five', f)}
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
                maxLength={1}
                placeholder={'0'}
                value={otpState.six}
                onChangeText={f => onChangeOtp('six', f)}
              />
            </View>

            <TextButton
              label={
                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      backgroundColor: {...(otpState != '')}
                        ? COLORS.primary
                        : COLORS.primary20,
                      borderRadius: SIZES.radius,
                      padding: 12,
                    }}
                    // onPress={() => show()}
                  >
                    Verify OTP...
                    <Feather name="arrow-right" size={20} color={COLORS.dark} />
                  </Text>
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
                // show();
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
    </View>
  );
};

export default AuthMain;

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
  },
});
