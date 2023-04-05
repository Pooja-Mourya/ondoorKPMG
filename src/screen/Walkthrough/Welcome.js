import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import TextButton from '../../components/TextButton';
import {FONTS, SIZES, COLORS} from '../../constants';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const Welcome = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
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
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
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

        <Text style={{marginTop: SIZES.padding, ...FONTS.h1}}>Welcome to</Text>
        <Text style={{marginTop: SIZES.base, ...FONTS.h1}}>Meeting</Text>
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
          label="Get Started"
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
  );
};

export default Welcome;
