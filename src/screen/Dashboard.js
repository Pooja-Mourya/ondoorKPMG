import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../constants';
import ApiMethod from '../Services/APIService';
import {useSelector} from 'react-redux';
import {useCustomHook} from './theme/ThemeContext';
import Header from '../components/layout/Header';

const UserList = props => {
  const {navigation} = props;
  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  //   console.log('token', token);
  const [listState, setListState] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userListApi = async () => {
    const url = constants.endPoint.dashboard;
    const params = {};
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      //   console.log('resultDashboarddata', result?.data?.data);
      //   console.log('resultDashboardmessage', result?.data?.message);
      setListState(result?.data?.message);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    userListApi();
  }, []);

  return (
    <>
      <Header
        textHeader={'DASHBOARD'}
        menuBar={true}
        onPressArrow={() => navigation.toggleDrawer()}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: dark ? COLORS.light : COLORS.dark,
        }}
      >
        <View style={{marginBottom: 20}}>
          {isRefreshing ? (
            <ActivityIndicator color={!dark ? COLORS.light : COLORS.dark} />
          ) : null}
        </View>

        <Text
          style={{
            backgroundColor: COLORS.primary,
            width: '80%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            elevation: 2,
            textAlign: 'center',
            height: '25%',
            fontSize: 36,
            color: COLORS.light,
          }}
        >
          USER COUNT : {listState?.userCount ? listState?.userCount : '0'}
        </Text>
        <Text
          style={{
            backgroundColor: COLORS.primary,
            width: '80%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            marginTop: 20,
            elevation: 2,
            textAlign: 'center',
            height: '25%',
            fontSize: 36,
            color: COLORS.light,
            //   paddingTop: 20,
          }}
        >
          MEETING COUNT :{' '}
          {listState?.meetingCount ? listState?.meetingCount : '0'}
        </Text>
        <Text
          style={{
            backgroundColor: COLORS.primary,
            width: '80%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            marginTop: 20,
            elevation: 2,
            textAlign: 'center',
            height: '25%',
            fontSize: 36,
            color: COLORS.light,
            //   paddingTop: 20,
          }}
        >
          TODAY MEETING COUNT :
          {listState?.todayMeetingCount ? listState?.todayMeetingCount : '0'}
        </Text>
      </View>
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
