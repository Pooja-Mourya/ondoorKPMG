import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SIZES, COLORS} from '../constants';
import MyDrawer from './MyDrawer';
import Meeting from '../screen/mainscreen/meeting/Meeting';
import Notes from '../screen/mainscreen/notes/Notes';
import {ImageUpload} from '../screen';

const Tab = createBottomTabNavigator();

export default function MyTab() {
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
              <View>
                <Image
                  source={require('../assets/icons/person.png')}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </View>
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
              <View>
                <Image
                  source={require('../assets/icons/call.png')}
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
              <View>
                <Image
                  source={require('../assets/icons/contact.png')}
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
        name="More"
        component={MyDrawer}
      />
    </Tab.Navigator>
  );
}
