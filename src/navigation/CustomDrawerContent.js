import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
import {FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constants';

function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: COLORS.secondary80,
          margin: 10,
          borderRadius: SIZES.radius,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            margin: 10,
            alignSelf: 'center',
            borderRadius: 50,
            borderWidth: 3,
            borderColor: COLORS.light,
          }}
          source={{
            uri:
              'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
        />
        <Text style={{textAlign: 'center', fontSize: SIZES.h3}}>USER NAME</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerContentScrollView {...props}></DrawerContentScrollView>
      <View
        style={{
          backgroundColor: COLORS.support3,
          height: 80,
          borderTopRightRadius: SIZES.radius,
          borderTopLeftRadius: SIZES.radius,
          padding: SIZES.padding,
        }}
      >
        <Text>2022-23</Text>
      </View>
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({});
