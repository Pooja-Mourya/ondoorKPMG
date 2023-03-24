import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, constants, FONTS, SIZES} from '../constants';
import TextButton from '../components/TextButton';
import {useSelector} from 'react-redux';
import ApiMethod from '../Services/APIService';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawerContent(props) {
  const [loader, setLoader] = useState(false);
  const token = useSelector(state => state?.user?.user?.access_token);

  const {navigation} = props;
  const submitHandle = async () => {
    const url = constants.endPoint.logout;
    const params = {};
    // return;
    try {
      setLoader(true);
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result);

      AsyncStorage.removeItem('@user');
      setLoader(false);
      navigation.navigate('AuthMain');
    } catch (error) {
      console.log('error', error);
    }
  };

  //   if (loader) return <ActivityIndicator />;
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
          backgroundColor: COLORS.primary,
          height: 80,
          borderTopRightRadius: SIZES.radius,
          borderTopLeftRadius: SIZES.radius,
          padding: SIZES.padding,
        }}
      >
        {/* <Text>2022-23</Text> */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <AntDesign name="logout" size={20} color={COLORS.light} />
          <TouchableOpacity onPress={() => submitHandle()}>
            <Text
              style={{
                ...FONTS.font1,
                color: COLORS.light,
                fontWeight: '500',
                marginHorizontal: 12,
              }}
            >
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({});
