import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({
  userName,
  userTitle,
  value,
  onChangeText,
  onPressSort,
  rightIcon,
  leftIcon,
  searchBar,
  onPressArrow,
  iconVideoCall,
  iconNotification,
  textHeader,
  userProfile,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.support1,
        padding: 10,
        // height: (SIZES.height * 1) / 5.8,
      }}
    >
      <View style={{flexDirection: 'row'}}>
        {userProfile ? (
          <Image
            source={require('../../assets/images/banner-01.png')}
            style={{
              width: 45,
              height: 45,
              borderRadius: 50,
              top: 5,
              left: 10,
              backgroundColor: COLORS.dark,
            }}
          />
        ) : null}
        {userTitle ? (
          <View style={{margin: 10, paddingHorizontal: 10, width: '60%'}}>
            <Text style={{fontSize: 16, color: COLORS.dark}}>{userName}</Text>
            <Text>{userTitle}</Text>
          </View>
        ) : null}

        {iconVideoCall ? (
          <TouchableOpacity onPress={() => navigation.navigate('ChatVideo')}>
            <Image
              source={require('../../assets/icons/live-streaming.png')}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                top: 10,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {iconNotification ? (
          <TouchableOpacity onPress={() => setBellModal(true)}>
            <Image
              source={require('../../assets/icons/bell.png')}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                top: 10,
                left: 15,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {/* 122 */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          width: leftIcon ? '80%' : '97%',
        }}
      >
        {leftIcon ? (
          <TouchableOpacity onPress={leftIcon ? onPressArrow : null}>
            <Image
              source={require('../../assets/icons/arrow-left.png')}
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLORS.light20,
                borderRadius: SIZES.radius,
                padding: 25,
                marginHorizontal: 5,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {searchBar ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.light20,
              borderRadius: SIZES.radius,
              width: leftIcon || rightIcon ? '85%' : '100%',
              marginRight: 5,
            }}
          >
            <Image
              source={require('../../assets/icons/search.png')}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                left: 15,
                marginVertical: 10,
              }}
            />

            <TextInput
              placeholder="search"
              value={searchBar ? value : ''}
              onChangeText={searchBar ? onChangeText : null}
              style={{
                borderRadius: SIZES.radius,
                // backgroundColor: 'red',
                width: '70%',
                paddingHorizontal: 10,
                marginHorizontal: 10,
              }}
            />
          </View>
        ) : (
          <Text
            style={{
              backgroundColor: COLORS.light20,
              width: rightIcon == true ? '75%' : '95%',
              paddingHorizontal: 10,
              marginHorizontal: 10,
              borderRadius: SIZES.radius,
              fontSize: SIZES.h2,
              textAlign: 'center',
              alignSelf: 'center',
              paddingVertical: 10,
              color: COLORS.primary,
            }}
          >
            {textHeader}
          </Text>
        )}
        {rightIcon ? (
          <TouchableOpacity
            onPress={leftIcon ? onPressSort : null}
            style={{
              //   width: 30,
              //   height: 30,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.light20,
              padding: 10,
            }}
          >
            <Ionicons name="filter-sharp" size={27} color={COLORS.primary} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
