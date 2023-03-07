import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/layout/Header';

const ViewUser = props => {
  const userView = props.route.params;
  return (
    <>
      <Header textHeader={'View User Details'} />
      <View>
        <Text>{userView.id}</Text>
        <Text>{userView.name}</Text>
        <Text>{userView.email}</Text>
        <Text>{userView.mobile_number}</Text>
        <Text>{userView.designation}</Text>
        <Text>
          {userView.address == null ? 'undefine Address' : userView.address}
        </Text>
        <Text>{userView.role_id}</Text>
        <Text>{userView.status == 1 ? 'active' : 'inactive'}</Text>
      </View>
    </>
  );
};

export default ViewUser;

const styles = StyleSheet.create({});
