import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ViewRoles = props => {
  const {navigation} = props;

  const roleView = props.route.params;

  return (
    <View>
      <Text>{roleView.name}</Text>
    </View>
  );
};

export default ViewRoles;

const styles = StyleSheet.create({});
