import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SIZES, COLORS} from '../constants';

const Tab = createBottomTabNavigator();

export default function MyTab() {
  const Home = () => {
    return <Text>screens</Text>;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveTintColor: COLORS.light,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        options={() => ({
          headerShowLabel: false,
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
        name="Chat"
        component={Home}
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
        name="Call"
        component={Home}
      />
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
        // h={false}
        name="Contact"
        component={Home}
      />
    </Tab.Navigator>
  );
}
