import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../constants';
import TextButton from '../../components/TextButton';
import Header from '../../components/layout/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileUpdate from './ProfileUpdate';
import UpdatePassword from './UpdatePassword';
import {useCustomHook} from '../theme/ThemeContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

const Profile = ({navigation}) => {
  const user = useSelector(state => state.user.user);

  const {dark} = useCustomHook;
  const [profileModal, setProfileModal] = useState(false);
  const [upPassModal, setUpPassModal] = useState(false);
  return (
    <>
      <Header
        textHeader={'User Profile'}
        onPressArrow={() => navigation.toggleDrawer()}
        menuBar={true}
      />

      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            backgroundColor: COLORS.light,
            margin: 20,
            padding: 10,
            borderRadius: SIZES.radius,
          }}
        >
          <AntDesign name="user" size={35} color={COLORS.primary} />
          <View style={{}}>
            <Text style={{color: COLORS.primary}}>Personal Details</Text>
            <Text style={{color: COLORS.primary}}>
              Click on the edit button to edit the details.
            </Text>
          </View>
        </View>
        <View style={{margin: 20}}>
          <Text
            style={{color: dark ? COLORS.dark : COLORS.primary, fontSize: 20}}
          >
            <AntDesign
              name="user"
              size={25}
              color={dark ? COLORS.dark : COLORS.primary}
            />{' '}
            {user.name}
          </Text>
          <Text
            style={{color: dark ? COLORS.dark : COLORS.primary, fontSize: 20}}
          >
            <Fontisto
              name="email"
              size={25}
              color={dark ? COLORS.dark : COLORS.primary}
            />{' '}
            {user.email}
          </Text>
          <Text
            style={{color: dark ? COLORS.dark : COLORS.primary, fontSize: 20}}
          >
            <AntDesign
              name="phone"
              size={25}
              color={dark ? COLORS.dark : COLORS.primary}
            />{' '}
            {user.mobile_number}
          </Text>
          <Text
            style={{color: dark ? COLORS.dark : COLORS.primary, fontSize: 20}}
          >
            <AntDesign
              name="antdesign"
              size={25}
              color={dark ? COLORS.dark : COLORS.primary}
            />{' '}
            {user.designation}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextButton
            label={
              <>
                <Text>
                  {''}
                  <AntDesign name={'edit'} size={20} color={COLORS.light} />
                  Edit
                </Text>
              </>
            }
            contentContainerStyle={{
              height: 45,
              //   backgroundColor: activeStatus == '1' ? COLORS.primary : COLORS.grey80,
              paddingHorizontal: 30,
              borderRadius: SIZES.radius,
            }}
            labelStyle={{
              //   color: activeStatus == '1' ? COLORS.light : COLORS.primary,
              ...FONTS.h4,
              fontWeight: '500',
              fontSize: 18,
            }}
            onPress={() => setProfileModal(!profileModal)}
          />
          <TextButton
            label={
              <>
                <MaterialCommunityIcons
                  name={'update'}
                  size={25}
                  color={COLORS.light}
                  style={{marginTop: 5}}
                />
                <Text>Update Password</Text>
              </>
            }
            contentContainerStyle={{
              height: 45,
              //   backgroundColor: activeStatus == '1' ? COLORS.primary : COLORS.grey80,
              paddingHorizontal: 30,
              borderRadius: SIZES.radius,
            }}
            labelStyle={{
              //   color: activeStatus == '1' ? COLORS.light : COLORS.primary,
              ...FONTS.h4,
              fontWeight: '500',
              fontSize: 18,
            }}
            onPress={() => setUpPassModal(!upPassModal)}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={upPassModal ? upPassModal : profileModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          upPassModal
            ? setUpPassModal(!upPassModal)
            : setProfileModal(!profileModal);
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              marginBottom: 20,
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            {upPassModal ? (
              <UpdatePassword
                upPassModal={upPassModal}
                setUpPassModal={setUpPassModal}
              />
            ) : (
              <ProfileUpdate
                profileModal={profileModal}
                setProfileModal={setProfileModal}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
