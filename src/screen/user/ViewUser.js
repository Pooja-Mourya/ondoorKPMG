import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/layout/Header';
import moment from 'moment';
import {COLORS, SIZES} from '../../constants';

const ViewUser = props => {
  const {navigation} = props;
  const userView = props.route.params;
  return (
    <>
      <Header
        textHeader={'View User Details'}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          padding: SIZES.padding,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.secondary80,
        }}
      >
        <Text>Status: {userView.status == 1 ? 'active' : 'inactive'}</Text>
        <Text>
          id: <Text></Text>
          {userView.id}
        </Text>
        <Text>
          Name : <Text></Text>
          {userView.name}
        </Text>
        <Text>
          Email: <Text></Text>
          {userView.email}
        </Text>
        <Text>
          Number : <Text></Text>
          {userView.mobile_number}
        </Text>
        <Text>
          Address : <Text></Text>
          {userView.address == null ? 'undefine' : userView.address}
        </Text>
        <Text>
          Designation: <Text></Text>
          {userView.designation}
        </Text>
        <Text>
          Created By<Text></Text>
          {userView.created_by == null ? 'undefine' : userView.created_by}
        </Text>
        <Text>
          Last Update Password: <Text></Text>
          {userView.password_last_updated == null
            ? 'undefine'
            : userView.password_last_updated}
        </Text>

        <Text>
          Created At: <Text></Text>
          {moment(userView.created_at).format('L')}
        </Text>
        <Text>
          Updated At : <Text></Text>
          {moment(userView.updated_at).format('L')}
        </Text>
        <Text>User Role</Text>
        <Text>
          User Id: <Text></Text>
          {userView.role.id}
        </Text>
        <Text>
          User Name: <Text></Text>
          {userView.role.name}
        </Text>
        <Text>
          User Email: <Text></Text>
          {userView.role.email}
        </Text>
      </View>
    </>
  );
};

export default ViewUser;

const styles = StyleSheet.create({});
