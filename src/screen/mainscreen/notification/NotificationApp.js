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
  Modal,
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
  const [readModal, setReadModal] = useState(false);

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

  const readId = Object.assign({}, listState.shift());

  const handleReadById = async () => {
    try {
      await ApiMethod.getData(`notification/${readId.id}/read`, token, null);
      setReadModal(true);
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
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleNotificationList();
  }, [page]);

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TextButton
          label={'Read All'}
          onPress={() => handleReadAllNotify()}
          contentContainerStyle={{
            //   height: 55,
            borderRadius: SIZES.radius,
            //   margin: 10,
            position: 'absolute',
            marginTop: -50,
            marginLeft: '70%',
            zIndex: 1,
          }}
          labelStyle={{
            padding: 10,
          }}
        />
      </View>

      <FlatList
        style={{backgroundColor: COLORS.primary, flex: 1}}
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
        renderItem={({item}) => {
          const createdDateFormate = moment(item.created_at).format('L');
          return (
            <>
              <View>
                <View
                  style={{
                    backgroundColor: COLORS.light20,
                    margin: 10,
                    borderRadius: SIZES.radius,
                    padding: 10,
                  }}
                >
                  <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor={COLORS.primary}
                      style={{
                        marginRight: 10,
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        backgroundColor: !readId
                          ? COLORS.secondary
                          : COLORS.light20,
                      }}
                      onPress={() => handleReadById(item)}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: !readId ? COLORS.secondary : COLORS.light,
                          marginTop: 15,
                          fontWeight: '700',
                          fontSize: 20,
                        }}
                      >
                        {item.type ? item.type.slice(0, 1).toUpperCase() : null}
                      </Text>
                    </TouchableHighlight>

                    <TouchableOpacity
                      onPress={() => {
                        item.type === 'action'
                          ? navigation.navigate('ActionList')
                          : navigation.navigate('Notes');
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.base,
                          fontWeight: '700',
                          fontSize: SIZES.h3,
                          paddingRight: 15,
                          width: '33%',
                        }}
                        numberOfLines={2}
                      >
                        {item.message}
                      </Text>

                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{color: COLORS.secondary, fontWeight: '700'}}
                        >
                          {createdDateFormate}
                        </Text>
                        <Text style={{}}>12:30</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          );
        }}
        // onEndReached={() => {
        //   //   console.log('load more');
        //   //   setPage(page + 1);
        //   handleNotificationList(page + 1);
        // }}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={() => (
        //   <ActivityIndicator size={'large'} color={'rosybrown'} />
        // )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={readModal}
        onRequestClose={() => {
          setReadModal(!readModal);
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.light20,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primary,
              margin: 10,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
              borderWidth: 2,
              borderColor: COLORS.light20,
            }}
          >
            <TouchableOpacity onPress={() => setReadModal(!readModal)}>
              <Text style={{textAlign: 'right', borderRadius: SIZES.radius}}>
                <AntDesign
                  style={{
                    backgroundColor: COLORS.light20,
                    padding: 10,
                  }}
                  name="close"
                  size={25}
                  color={COLORS.light}
                />
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
              }}
            >
              <Text style={{color: COLORS.light, fontSize: 16}}>
                {moment(readId.created_at).format('MMM Do YY')}
              </Text>
              <Text style={{color: COLORS.light, fontSize: 16}}>
                Sender : {readId.sender_id}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-around',
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  color: COLORS.light,
                  fontSize: 16,
                  backgroundColor: COLORS.light20,
                  padding: 5,
                  borderRadius: SIZES.radius,
                }}
              >
                {readId.status_code}
              </Text>
              <Text style={{color: COLORS.light, fontSize: 16}}>
                {readId.type}
              </Text>
            </View>

            <Text style={{color: COLORS.light, fontWeight: '600'}}>
              {readId.title}
            </Text>

            <Text
              style={{
                color: COLORS.light,
                fontWeight: '600',
                paddingVertical: 12,
                ...FONTS.body2,
              }}
            >
              {readId.message}
            </Text>
            <Text
              style={{color: COLORS.light, fontSize: 16, textAlign: 'right'}}
            >
              Update Date : {moment(readId.updated_at).format('MMM Do YY')}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NotificationApp;

const styles = StyleSheet.create({});
