import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Shadow} from 'react-native-shadow-2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import {COLORS, SIZES, FONTS} from '../../constants';
import TextButton from '../../components/TextButton';

const AuthMain = ({navigation}) => {
  const [mode, setMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState(0);
  const [click, setClick] = useState(false);

  function SignInFunction() {
    return (
      <Animated.View
        style={{marginTop: SIZES.padding, height: SIZES.height * 0.55}}
      >
        <Shadow>
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
                  onPress={() => navigation.navigate('Forgot')}
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
                onPress={() => navigation.navigate('MyTab')}
              />
            </KeyboardAwareScrollView>
          </View>
        </Shadow>
      </Animated.View>
    );
  }

  function SignUpFunction() {
    return (
      <Animated.View
        style={{marginTop: SIZES.padding, height: SIZES.height * 0.6}}
      >
        <Shadow>
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
                placeholder="Name"
                value={name}
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
                placeholder="Number"
                value={number}
                onChange={number => setNumber(number)}
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
              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="Confirm Password"
                secureTextEntry={click}
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
              />
            </KeyboardAwareScrollView>
          </View>
        </Shadow>
      </Animated.View>
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
            if (mode == true) {
              setMode('SignUp');
              SignUpFunction();
            } else {
              setMode('SignIn');
              SignInFunction();
            }
          }}
        />
      </View>
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
