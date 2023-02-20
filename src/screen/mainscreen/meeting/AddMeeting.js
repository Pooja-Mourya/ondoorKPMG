import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/layout/Header';

const AddMeeting = () => {
  return (
    <>
      <Header textHeader={'Add Meeting'} leftIcon={true} rightIcon={true} />
      <Text>AddMeeting</Text>
    </>
  );
};

export default AddMeeting;

const styles = StyleSheet.create({});
