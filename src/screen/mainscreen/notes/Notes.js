import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/layout/Header';

const Notes = ({navigation}) => {
  return (
    <View>
      <Header
        textHeader="Notes"
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <Text></Text>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({});
