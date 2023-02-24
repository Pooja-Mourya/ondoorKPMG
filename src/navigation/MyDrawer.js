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

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
function Logout({navigation}) {
  const token = useSelector(state => state?.user?.user);
  console.log('logout token', token);

  const [logout, setLogout] = useState(true);
  const [loader, setLoader] = useState(false);

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
      navigation.navigate('Walkthrough');
    } catch (error) {
      console.log('error', error);
    }
  };

  if (loader) return <ActivityIndicator />;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={logout}
      onRequestClose={() => {
        setLogout(!logout);
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: COLORS.support1,
        }}
      >
        <TextButton
          label={'LOGOUT'}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            margin: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
            padding: SIZES.padding,
          }}
          onPress={() => submitHandle()}
        />
        <TextButton
          label={'CANCEL'}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            margin: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
            padding: SIZES.padding,
          }}
          onPress={() => setLogout(false)}
        />
      </View>
    </Modal>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      //   drawerContentOptions={{
      // }}
      screenOptions={{
        activeTintColor: 'red',
        itemStyle: {marginVertical: 5},
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        activeTintColor: 'white',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <AntDesign name="home" size={20} color={COLORS.dark} />
          ),
          //   headerShown: false,
        }}
      />
      <Drawer.Screen
        name="User"
        component={UserList}
        options={{
          drawerIcon: () => (
            <AntDesign name="user" size={20} color={COLORS.dark} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: () => (
            <AntDesign name="contacts" size={20} color={COLORS.dark} />
          ),
          //   headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: () => (
            <AntDesign name="logout" size={20} color={COLORS.dark} />
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
