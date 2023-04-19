import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCustomHook} from '../../theme/ThemeContext';
import {COLORS} from '../../../constants';

const ViewPermission = () => {
  const {dark} = useCustomHook();
  return (
    <View>
      <Text style={{color: !dark ? COLORS.light : COLORS.dark}}>
        ViewPermission
      </Text>
    </View>
  );
};

export default ViewPermission;

const styles = StyleSheet.create({});
