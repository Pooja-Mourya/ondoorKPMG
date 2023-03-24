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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import LoaderFile from '../LoaderFile';
import {CommonActions} from '@react-navigation/native';
import CheckBox from '../../components/CheckBox';

const AuthMain = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);
  const [enableCheck, setEnableCheck] = useState(false);
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
  const [loginUser, setLoginUser] = useState([]);
  const [check, setCheck] = useState(false);
  const [logged, setLogged] = useState('');
  const [otpState, setOtpState] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
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
      logout_from_all_devices: 'yes',
    };
    const result = await ApiMethod.postData(url, params, null)
      .then(function () {
        console.log('login result', result);
        // setLoad(true);
        if (result) {
          setLoginOtpModal(false);
          setLoginUser(result.data);
        } else {
          Alert.alert(`retry ${result.message}`);
          setLoginOtpModal(true);
          Alert.alert(`${result.data.message} successfully`);
        }
      })
      .catch(function (error) {
        if (!error) {
          const logInCondition = error.response?.data?.data?.is_logged_in;
          setLogged(logInCondition);
          Alert.alert(`something went wrong`, `${logInCondition}`, [
            {text: 'ok', onPress: () => {}},
          ]);
          console.log('error****', error.message);
        } else {
          setLoginOtpModal(true);
        }
      });
  };

  const HandleSignUp = async () => {
    const url = constants.endPoint.register;
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

      if (variable !== null) {
        console.log('variable', variable);
        // navigation.navigate('MyTab');

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

  const verifyOtp = async () => {
    let url = constants.endPoint.verifyOtp;
    let params = {
      //   email: loginUser.data[0],
      //   otp: loginUser.data[1],
      email: 'admin@gmail.com',
      otp: '1234',
    };

    console.log('params', params);
    // setLoad(true);
    try {
      const otpResult = await ApiMethod.postData(url, params, null);
      //   console.log('access_token', otpResult.data.data);
      //   return;

      if (otpResult) {
        Alert.alert(`${otpResult.data.message}`);
        AsyncStorage.setItem('@user', otpResult.data.data.access_token);
        dispatch(userLoginFun(otpResult?.data.data));
        setLoad(false);
        setLoginOtpModal(false);
        navigation.navigate('MyTab');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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
            Sign in to continue
          </Text>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={'handled'}
            extraScrollHeight={-300}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}
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
              secureTextEntry={true}
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
            />
            {errors ? (
              <Text style={{color: COLORS.error}}>please enter password</Text>
            ) : (
              <Text></Text>
            )}
            {logged ? (
              <View style={{marginHorizontal: 12}}>
                <CheckBox
                  CheckBoxText={'logout from all devices'}
                  containerStyle={{backgroundColor: '', lineHeight: 20}}
                  isSelected={enableCheck}
                  onPress={() => {
                    setEnableCheck(!enableCheck);
                  }}
                />
              </View>
            ) : null}

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
              label={'Log In'}
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
              //   <Image
              //     source={require('../../assets/icons/call.png')}
              //     style={{
              //       width: 20,
              //       height: 20,
              //       marginRight: SIZES.base,
              //     }}
              //   />
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
  //   console.log('loginUser', loginUser);

  useEffect(() => {
    myFunction();
    // async () => {
    //   if (componentMounted.current) {
    //     myFunction();
    //     return () => {
    //       componentMounted.current = false;
    //     };
    //   }
    // };
  }, []);

  // if (loader || !token) return <LoaderFile />;

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
          <Text>OR login with</Text>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <Image
              source={require('../../assets/icons/google.png')}
              style={{width: 40, height: 40, marginHorizontal: 10}}
            />
            <Image
              source={require('../../assets/icons/twitter.png')}
              style={{width: 40, height: 40, marginHorizontal: 10}}
            />
            <Image
              source={require('../../assets/icons/linkedin.png')}
              style={{width: 40, height: 40, marginHorizontal: 10}}
            />
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
            backgroundColor: COLORS.light20,
          }}
        >
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              marginBottom: 20,
              backgroundColor: COLORS.secondary,
              borderRadius: SIZES.radius,
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
                label={'Submit'}
                contentContainerStyle={{
                  borderRadius: SIZES.radius,
                  //   margin: 10,
                }}
                labelStyle={{
                  color: COLORS.light,
                  ...FONTS.h4,
                  paddingHorizontal: SIZES.padding,
                }}
                onPress={() => {
                  setTimeout(() => {
                    verifyOtp();
                  }, 1000);
                }}
              />
            </View>
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
