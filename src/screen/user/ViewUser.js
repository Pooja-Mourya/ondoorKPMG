import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/layout/Header';
import moment from 'moment';
import {COLORS, FONTS, SIZES} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
          backgroundColor: COLORS.light80,
          //   flexDirection: 'column',
          //   justifyContent: 'space-between',
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: COLORS.primary,
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                color: COLORS.light,
                fontSize: 20,
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              {!userView.name.slice(0, 1) ? null : userView.name.slice(0, 1)}
            </Text>
          </View>
          <View style={{marginHorizontal: 15, marginTop: 5}}>
            <Text
              style={{
                fontWeight: '700',
                paddingTop: 3,
                ...FONTS.font1,
                fontSize: 20,
              }}
            >
              {userView.name}
            </Text>
            <Text style={{fontWeight: '700', ...FONTS.font1, fontSize: 20}}>
              {userView.email}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontWeight: '500',
              paddingTop: 10,
              ...FONTS.font1,
            }}
          >
            {userView.created_by == null ? '____________' : userView.created_by}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              paddingTop: 10,
              ...FONTS.font1,
              color: userView.status == 1 ? 'green' : 'red',
              fontSize: 20,
              textDecorationLine: 'underline',
            }}
          >
            {userView.status == 1 ? 'active' : 'inactive'}
          </Text>
        </View>
        <Text
          style={{
            paddingTop: 10,
            ...FONTS.font1,
            fontWeight: '600',
            color: COLORS.dark,
          }}
        >
          Basic details
        </Text>

        <View style={{borderBottomWidth: 1, marginVertical: 10}}>
          <Text
            style={{
              paddingTop: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
            }}
          >
            <AntDesign name="user" size={20} color={COLORS.primary} />{' '}
            {userView.id}
          </Text>

          <Text
            style={{
              paddingTop: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
            }}
          >
            <AntDesign name="phone" size={20} color={COLORS.primary} />{' '}
            {userView.mobile_number}
          </Text>
          <Text
            style={{
              paddingTop: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
            }}
          >
            <AntDesign name="car" size={20} color={COLORS.primary} />{' '}
            {userView.address == null ? '________________' : userView.address}
          </Text>
          <Text
            style={{
              paddingVertical: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
              marginBottom: 12,
            }}
          >
            <AntDesign name="like2" size={20} color={COLORS.primary} />{' '}
            {userView.designation}
          </Text>
        </View>

        {/* <View> */}
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 10,
            color: COLORS.dark,
          }}
        >
          Last Update Password{' '}
          <Text>
            {userView.password_last_updated == null
              ? '________________'
              : userView.password_last_updated}
          </Text>
        </Text>
        {/* </View> */}

        <Text style={{color: COLORS.dark, paddingVertical: 10}}>User Role</Text>
        <View style={{borderBottomWidth: 1, marginVertical: 10}}>
          <Text
            style={{
              paddingTop: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
            }}
          >
            <AntDesign name="user" size={20} color={COLORS.primary} />{' '}
            {userView.role.id}
          </Text>

          <Text
            style={{
              paddingTop: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
            }}
          >
            <AntDesign name="adduser" size={20} color={COLORS.primary} />{' '}
            {userView.role.name}
          </Text>
          <Text
            style={{
              paddingTop: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
            }}
          >
            <AntDesign name="google" size={20} color={COLORS.primary} />{' '}
            {userView.email == null ? '______________' : userView.email}
          </Text>
          <Text
            style={{
              paddingVertical: 10,
              ...FONTS.font1,
              fontWeight: '600',
              color: COLORS.dark,
              marginBottom: 12,
            }}
          >
            <AntDesign name="antdesign" size={20} color={COLORS.primary} />{' '}
            {userView.designation}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.primary80,
          padding: SIZES.padding,
          borderTopRightRadius: SIZES.radius,
          borderTopLeftRadius: SIZES.radius,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: '500',
              paddingTop: 3,
              ...FONTS.font1,
              marginLeft: 10,
              color: COLORS.light,
              fontSize: 16,
            }}
          >
            Created
          </Text>
          <Text
            style={{
              fontWeight: '500',
              paddingTop: 3,
              ...FONTS.font1,
              color: COLORS.light,
            }}
          >
            {moment(userView.created_at).format('L')}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontWeight: '500',
              paddingTop: 3,
              ...FONTS.font1,
              color: COLORS.light,
              fontSize: 16,
            }}
          >
            {' '}
            Updated
          </Text>
          <Text
            style={{
              fontWeight: '500',
              paddingTop: 3,
              ...FONTS.font1,
              color: COLORS.light,
            }}
          >
            {moment(userView.updated_at).format('L')}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ViewUser;

const styles = StyleSheet.create({});
