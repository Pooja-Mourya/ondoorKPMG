import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../../constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const ViewPermission = () => {
  const [otp, setOtp] = useState();
  const [clear, setClear] = useState(false);
  const onSubmit = () => {
    let temp = [...otp];
    // setOtp(otp) = temp;
    temp = setOtp(otp);
    console.log('in', temp);
  };
  console.log('first', otp);
  return (
    <View>
      <Text>ViewPermission</Text>
      {/* {Array(6)
        .fill()
        .map((_, index) => {
          return (
            <>
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
                autoComplete={'sms-otp'}
                keyboardType={'numeric'}
                maxLength={1}
                placeholder={'0'}
                value={otp[index]}
                onChangeText={() => setOtp(index)}
              />
            </>
          );
        })} */}
      {/* <Button
        title="Submit"
        onPress={() => {
          onSubmit();
        }}
      /> */}
      <OTPInputView
        style={{width: '80%', height: 200, backgroundColor: 'red'}}
        pinCount={6}
        code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={() => setOtp()}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
        // clearInputs={code => {
        //   setOtp(code);
        //   setClear(false);
        // }}
      />
    </View>
  );
};

export default ViewPermission;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
