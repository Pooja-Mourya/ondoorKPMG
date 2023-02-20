import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/layout/Header';
import {COLORS, SIZES} from '../../../constants';
import {FAB} from 'react-native-paper';

const Meeting = ({navigation}) => {
  return (
    <>
      <Header
        userName={'Niharika'}
        userTitle={'manager'}
        searchBar={true}
        rightIcon={true}
        leftIcon={true}
        onPressArrow={() => Alert.alert('Arrow onPress')}
        onPressSort={() => Alert.alert('Arrow onPress sort')}
        userProfile={true}
      />
      <View
        style={{
          backgroundColor: COLORS.support3_08,
          margin: 10,
          borderRadius: SIZES.radius,
          padding: SIZES.padding,
        }}
      >
        <Text>start Date</Text>
        <Text>end Date</Text>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddMeeting')}
      />
    </>
  );
};

export default Meeting;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
