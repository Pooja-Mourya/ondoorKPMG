import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../components/FormInput';
import {COLORS, FONTS, SIZES} from '../constants';
import TextButton from '../components/TextButton';

const ValidationForm = () => {
  const [email, setEmail] = useState('');
  const [check, setCheck] = useState(false);

  const handleEmailCheck = e => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmail(e);
    if (reg.test(e)) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  return (
    <View
      style={{
        margin: SIZES.padding,
        padding: 10,
        backgroundColor: COLORS.success80,
      }}
    >
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="Email"
        value={email}
        onChange={e => handleEmailCheck(e)}
        // onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
      />
      {check ? (
        <Text style={{color: COLORS.error}}>invalid email formate</Text>
      ) : (
        <Text></Text>
      )}
      <TextButton
        label={'Submit'}
        contentContainerStyle={{
          ...FONTS.base,
          padding: 5,
          borderRadius: SIZES.radius,
          marginVertical: 10,
        }}
        onPress={() => {}}
      />
    </View>
  );
};

export default ValidationForm;

const styles = StyleSheet.create({});
