import React, {useState} from 'react';
import {
  Button,
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import TextButton from '../components/TextButton';
import {COLORS, constants, FONTS, SIZES} from '../constants';
import {Shadow} from 'react-native-shadow-2';
import CustomDrawerContent from './CustomDrawerContent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../Services/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import UserList from '../screen/user/UserList';
import Roles from '../screen/mainscreen/role/Roles';
import Feather from 'react-native-vector-icons/Feather';
import {ActionList} from '../screen';
import AppSetting from '../screen/mainscreen/appSetting/AppSetting';
import Dashboard from '../screen/Dashboard';
import NotificationApp from '../screen/mainscreen/notification/NotificationApp';
import PermissionList from '../screen/mainscreen/permission/PermissionList';
import LogList from '../screen/logs/LogList';
import {useCustomHook} from '../screen/theme/ThemeContext';
import Profile from '../screen/profile/Profile';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const {dark} = useCustomHook();
  return (
    <Drawer.Navigator
      initialRouteName="DASHBOARD"
      screenOptions={{
        itemStyle: {marginVertical: 5},
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: !dark ? 'white' : 'white',
        drawerInactiveTintColor: !dark ? 'white' : 'black',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="DASHBOARD"
        component={Dashboard}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="home"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="user"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Permission"
        component={PermissionList}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="antdesign"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="Setting"
        component={AppSetting}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="setting"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          //   headerShown: false,
        }}
      /> */}
      <Drawer.Screen
        name="Notification"
        component={NotificationApp}
        options={{
          drawerIcon: () => (
            <>
              <AntDesign
                name="notification"
                size={20}
                color={dark ? COLORS.dark : COLORS.light}
              />
            </>
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Users"
        component={UserList}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="addusergroup"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Roles"
        component={Roles}
        options={{
          drawerIcon: () => (
            <Feather
              name="command"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Action"
        component={ActionList}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="contacts"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Logs"
        component={LogList}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="iconfontdesktop"
              size={20}
              color={dark ? COLORS.dark : COLORS.light}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
export default MyDrawer;

const styles = StyleSheet.create({
  circleContainer: {
    backgroundColor: 'rosybrown',
  },
});
