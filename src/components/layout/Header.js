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
import {useSelector} from 'react-redux';
import {StatusBar} from 'react-native';

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
  menuBar,
}) => {
  const userToken = useSelector(state => state?.user?.user);

  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.primary} />
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: 5,
          // height: (SIZES.height * 1) / 12,
        }}
      >
        {/* 122 */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            width: leftIcon || menuBar ? '80%' : '97%',
          }}
        >
          {menuBar ? (
            <TouchableOpacity
              style={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light20,
                padding: 10,
                marginLeft: 10,
              }}
              onPress={menuBar ? onPressArrow : null}
            >
              <Ionicons name="list-sharp" size={30} color={COLORS.dark} />
            </TouchableOpacity>
          ) : null}

          {leftIcon ? (
            <TouchableOpacity
              style={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light20,
                padding: 10,
                marginLeft: 10,
              }}
              onPress={leftIcon ? onPressArrow : null}
            >
              <Ionicons name="arrow-back" size={30} color={COLORS.dark} />
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
                //   value={searchBar ? value : ''}
                value={value}
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
                width: rightIcon == true || !menuBar == true ? '75%' : '95%',
                paddingHorizontal: 10,
                marginHorizontal: 10,
                borderRadius: SIZES.radius,
                fontSize: SIZES.h2,
                textAlign: 'center',
                alignSelf: 'center',
                paddingVertical: 10,
                color: COLORS.secondary,
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
              <Ionicons name="filter-sharp" size={27} color={COLORS.dark} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});

// <View style={{flexDirection: 'row'}}>
// {userProfile ? (
//   <View
//     style={{
//       width: 50,
//       height: 50,
//       borderRadius: 50,
//       top: 5,
//       left: 10,
//       backgroundColor: COLORS.dark,
//     }}
//   >
//     <Text
//       style={{
//         zIndex: 1,
//         color: COLORS.light,
//         fontSize: 25,
//         textAlign: 'center',
//         marginTop: 5,
//       }}
//     >
//       {/* {userToken.name} */}
//       {userToken?.name
//         ? userToken?.name?.slice(0, 1).toUpperCase()
//         : null}
//       {userToken?.email
//         ? userToken?.email?.slice(0, 1).toLowerCase()
//         : null}
//     </Text>
//   </View>
// ) : null}
// {userTitle ? (
//   <View style={{margin: 10, paddingHorizontal: 10, width: '60%'}}>
//     <Text style={{fontSize: 16, color: COLORS.dark}}>
//       {userToken.name}
//     </Text>
//     <Text>{userToken.email}</Text>
//   </View>
// ) : null}

// {iconVideoCall ? (
//   <TouchableOpacity onPress={() => navigation.navigate('ChatVideo')}>
//     <Image
//       source={require('../../assets/icons/live-streaming.png')}
//       style={{
//         width: 30,
//         height: 30,
//         borderRadius: 50,
//         top: 10,
//       }}
//     />
//   </TouchableOpacity>
// ) : null}
// {iconNotification ? (
//   <TouchableOpacity onPress={() => setBellModal(true)}>
//     <Image
//       source={require('../../assets/icons/bell.png')}
//       style={{
//         width: 30,
//         height: 30,
//         borderRadius: 50,
//         top: 10,
//         left: 15,
//       }}
//     />
//   </TouchableOpacity>
// ) : null}
// </View>
