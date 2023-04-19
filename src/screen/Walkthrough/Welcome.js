import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, useColorScheme} from 'react-native';
import TextButton from '../../components/TextButton';
import {FONTS, SIZES, COLORS} from '../../constants';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {useCustomHook} from '../theme/ThemeContext';
import {StatusBar} from 'react-native';

const Welcome = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);

  const {dark, color, themeFunction} = useCustomHook();

  const [loader, setLoader] = useState(false);

  async function myFunction() {
    setLoader(true);
    try {
      const variable = await AsyncStorage.getItem('@user');
      console.log('welcomeVariable***', variable);
      if (variable) {
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
  }, []);

  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          backgroundColor: dark ? COLORS.light : COLORS.dark,
          //   backgroundColor: color.background,
        }}
      >
        {/* Logo & Title */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: 150,
              height: 150,
            }}
          />

          <Text
            style={{
              marginTop: SIZES.padding,
              ...FONTS.h1,
              color: dark ? COLORS.dark : COLORS.light,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              marginTop: SIZES.base,
              ...FONTS.h1,
              color: dark ? COLORS.dark : COLORS.light,
            }}
          >
            Meeting
          </Text>
        </View>

        {/* Footer Buttons */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            marginBottom: 30,
          }}
        >
          <TextButton
            contentContainerStyle={{
              height: 50,
              borderRadius: SIZES.radius,
            }}
            label={'Get Started'}
            onPress={() =>
              user == null
                ? navigation.navigate('MyTab')
                : navigation.navigate('Walkthrough')
            }
            //   onPress={() => navigation.navigate('MyTab')}
          />

          {/* <TextButton
          contentContainerStyle={{
            height: 50,
            marginTop: SIZES.base,
            backgroundColor: null,
          }}
          label="Already have an account"
          labelStyle={{
            color: COLORS.primary,
          }}
          onPress={() => navigation.navigate('Walkthrough')}
        /> */}
        </View>
      </View>
    </>
  );
};

export default Welcome;
