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

const UserList = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  //   console.log('token', token);
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

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

  if (isRefreshing === true) return <ActivityIndicator />;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          //   paddingTop: 20,
        }}
      >
        USER COUNT : {listState.userCount}
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
        MEETING COUNT : {listState.meetingCount}
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
        TODAY MEETING COUNT : {listState.todayMeetingCount}
      </Text>
    </View>
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
