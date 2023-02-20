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
import {COLORS, FONTS, SIZES} from '../constants';
import {Shadow} from 'react-native-shadow-2';
import CustomDrawerContent from './CustomDrawerContent';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const [logout, setLogout] = useState(true);
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
      drawerContentOptions={{
        activeTintColor: 'red',
        itemStyle: {marginVertical: 5},
      }}
      screenOptions={{
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
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: () => (
            <AntDesign name="home" size={20} color={COLORS.dark} />
          ),
          //   headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: () => (
            <AntDesign name="home" size={20} color={COLORS.dark} />
          ),
          //   headerShown: false,
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
