import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SIZES, COLORS} from '../constants';
import MyDrawer from './MyDrawer';
import Meeting from '../screen/mainscreen/meeting/Meeting';
import Notes from '../screen/mainscreen/notes/Notes';
import {ImageUpload} from '../screen';
import {useCustomHook} from '../screen/theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function MyTab() {
  const {dark} = useCustomHook();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.light,
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        options={() => ({
          tabBarIcon: () => {
            return (
              <AntDesign
                name="user"
                size={23}
                color={dark ? COLORS.dark : COLORS.light}
              />
            );
          },
        })}
        name="Meeting"
        component={Meeting}
      />
      <Tab.Screen
        options={() => ({
          tabBarIcon: () => {
            return (
              <AntDesign
                name="edit"
                size={23}
                color={dark ? COLORS.dark : COLORS.light}
              />
            );
          },
        })}
        name="Notes"
        component={Notes}
      />

      {/* <Tab.Screen
        options={() => ({
          tabBarIcon: () => {
            return (
              <View>
                <Image
                  source={require('../assets/icons/add.png')}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: SIZES.base,
                  }}
                />
              </View>
            );
          },
        })}
        name="Upload"
        component={ImageUpload}
      /> */}

      <Tab.Screen
        options={() => ({
          tabBarIcon: () => {
            return (
              <MaterialIcons
                name="read-more"
                size={25}
                color={dark ? COLORS.dark : COLORS.light}
              />
            );
          },
        })}
        name="More"
        component={MyDrawer}
      />
    </Tab.Navigator>
  );
}
