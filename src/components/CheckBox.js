import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';

const CheckBox = ({containerStyle, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', ...containerStyle}}
      onPress={onPress}
    >
      <View
        style={{
          width: 25,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: isSelected ? COLORS.primary : COLORS.light,
          backgroundColor: isSelected ? COLORS.primary : COLORS.dark,
        }}
      >
        {isSelected ? (
          <Image
            source={require('../assets/icons/checkmark.png')}
            style={{width: 20, height: 20, tintColor: COLORS.light}}
          />
        ) : (
          <Image
            source={require('../assets/icons/close.png')}
            style={{width: 20, height: 20, tintColor: COLORS.light}}
          />
        )}
      </View>
      <Text
        style={{
          flex: 1,
          marginLeft: SIZES.base,
          ...FONTS.body5,
          lineHeight: 20,
        }}
      >
        By registering , you agree to our terms
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
