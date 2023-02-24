import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
// import {Shadow} from 'react-native-shadow-2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import {COLORS, SIZES, FONTS, constants} from '../../constants';
import TextButton from '../../components/TextButton';
import ApiMethod from '../../Services/APIService';
import {useDispatch} from 'react-redux';
import {userLoginFun} from '../../redux/slice/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '../../components/CheckBox';

const AuthMain = ({navigation}) => {
  const token = useSelector(state => state?.user?.user);
  const [mode, setMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [click, setClick] = useState(false);
  const [loginUser, setLoginUser] = useState([]);
  const [load, setLoad] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [forgetPassword, setForgetPassword] = useState('');
  const [termChecked, setTermChecked] = useState(false);

  const dispatch = useDispatch();

  function SignInFunction() {
    if (load) return <ActivityIndicator />;
    return (
      <Animated.View
        style={{marginTop: SIZES.padding, height: SIZES.height * 0.55}}
      >
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
              onChange={text => setEmail(text)}
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
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChange={text => setPassword(text)}
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
              onPress={() => submitHandle()}
            />
          </KeyboardAwareScrollView>
        </View>
      </Animated.View>
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
            prependComponent={
              <Image
                source={require('../../assets/icons/call.png')}
                style={{
                  width: 20,
                  height: 20,
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
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChange={p => setPassword(p)}
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
            secureTextEntry={click}
            value={confirmPassword}
            onChange={p => setConfirmPassword(p)}
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
                      ? require('../../assets/icons/eye.png')
                      : require('../../assets/icons/eye-off.png')
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
            prependComponent={
              <Image
                source={require('../../assets/icons/credit_card.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <CheckBox
            containerStyle={{backgroundColor: '', lineHeight: 20}}
            isSelected={termChecked}
            onPress={() => setTermChecked(!termChecked)}
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
            onPress={() => HandleSignUp()}
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

  const submitHandle = async () => {
    const url = constants.endPoint.login;
    const params = {
      email: 'admin@gmail.com',
      password: '12345678',
      //   email,
      //   password,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, null);
      //   console.log('result', result?.data?.data?.access_token);

      //   return;
      setLoginUser(result?.data);

      if (result?.data?.data?.access_token) {
        AsyncStorage.setItem('@user', result?.data?.data?.access_token);
        dispatch(userLoginFun(result?.data?.data?.access_token));
        setLoad(false);
        navigation.navigate('MyTab');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const HandleSignUp = async () => {
    const url = constants.endPoint.register;
    const params = {
      name,
      email,
      number,
      password,
      designation,
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
      const url = await constants.endPoint.forgetPassword;
      const params = {
        // email: forgetPassword,
        email: 'admin@gmail.com',
      };

      // return
      const result = ApiMethod.postData(url, params, token);
      console.log('result', result);
      if (result) {
        result.message;
        navigation.navigate('Resetpassword');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  async function myFunction() {
    try {
      const variable = await AsyncStorage.getItem('@user');
      if (variable !== null) {
        console.log('"variable"', variable);
        dispatch(userLoginFun(variable));
        navigation.navigate('MyTab');
      }
    } catch (error) {
      console.log('AppError', error);
    }
  }

  useEffect(() => {
    myFunction();
  }, []);
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
        style={{alignItems: 'flex-start', position: 'absolute', marginTop: 490}}
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
