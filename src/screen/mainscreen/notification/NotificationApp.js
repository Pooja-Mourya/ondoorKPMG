import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import TextButton from '../../../components/TextButton';

const NotificationApp = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  //   const newly = props.route.params;

  //   console.log('newly', newly);
  const navigation = useNavigation();
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [textColor, setTextColor] = useState('rgb(210, 210, 210)');

  const handleNotificationList = async () => {
    const url = constants.endPoint.notifications;
    const params = {
      page: 1,
      per_page_record: '5',
    };
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('resultNotification', result?.data?.data, 'url', url);
      setListState(result?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleReadAllNotify = async () => {
    const url = constants.endPoint.readAllNotification;
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.getData(url, token, null);
      console.log('resultRead', result?.data?.data, 'url', url);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleNotificationList();
  }, [page]);

  console.log('textColor', textColor);
  return (
    <>
      <TextButton
        label={'Read All Notification'}
        onPress={() => handleReadAllNotify()}
        contentContainerStyle={{
          height: 55,
          borderRadius: SIZES.radius,
          margin: 10,
        }}
      />
      <FlatList
        // data={listState.filter(f =>
        //   f.meeting_title.toLowerCase().includes(search).toLowerCase(),
        // )}
        style={{
          backgroundColor: 'pink',
          borderRadius: SIZES.radius,
          marginHorizontal: 10,
          marginBottom: 10,
        }}
        data={Array.isArray(listState) ? listState : []}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              handleNotificationList(null, true);
            }}
          />
        }
        renderItem={({item, index}) => {
          const createdDateFormate = moment(item.created_at).format('L');
          //   console.log('type :', item.type);
          return (
            <>
              <View
                style={{
                  backgroundColor: COLORS.support3_08,
                  margin: 10,
                  borderRadius: SIZES.radius,
                  padding: SIZES.padding,
                }}
              >
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    style={{
                      marginRight: 10,
                      backgroundColor:
                        textColor === index
                          ? COLORS.support1
                          : 'rgb(210, 210, 210)',
                    }}
                    onPress={() => setTextColor(COLORS.primary)}
                  >
                    <Text>
                      <Ionicons
                        name={'md-alert-outline'}
                        size={25}
                        color={COLORS.primary}
                      />
                    </Text>
                  </TouchableHighlight>

                  <TouchableOpacity
                    onPress={() =>
                      item.type === 'action'
                        ? navigation.navigate('ActionList')
                        : navigation.navigate('Notes')
                    }
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.base,
                        fontWeight: '700',
                        fontSize: SIZES.h3,
                        paddingRight: 15,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{paddingRight: 15}}>{item.message}</Text>
                    <Text style={{color: COLORS.secondary, fontWeight: '700'}}>
                      {createdDateFormate}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
        onEndReached={() => {
          //   console.log('load more');
          //   setPage(page + 1);
          handleNotificationList(page + 1);
        }}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={() => (
        //   <ActivityIndicator size={'large'} color={'rosybrown'} />
        // )}
      />
    </>
  );
};

export default NotificationApp;

const styles = StyleSheet.create({});
