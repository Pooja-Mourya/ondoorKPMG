import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {COLORS, constants, SIZES} from '../../../constants';
import {FAB} from 'react-native-paper';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';

const Meeting = ({navigation}) => {
  const token = useSelector(state => state?.user?.user);
  console.log('token', token);
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const handleMeetingList = async () => {
    const url = constants.endPoint.meetingList;
    const params = {
      //   page: 1,
      //   per_page_record: '10',
    };
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data, 'url', url);
      setListState(result?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleMeetingList();
  }, [page]);
  return (
    <>
      <Header
        userName={'Niharika'}
        userTitle={'manager'}
        searchBar={true}
        rightIcon={true}
        leftIcon={true}
        onPressArrow={() => Alert.alert('Arrow onPress')}
        onPressSort={() => Alert.alert('Arrow onPress sort')}
        userProfile={true}
      />

      <FlatList
        data={listState}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              handleMeetingList(null, true);
            }}
          />
        }
        renderItem={({item}) => {
          //   console.log('item', item?.documents[0]?.uploading_file_name);
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
                <Text>{item.meetRandomId}</Text>
                {/* <Text>{item.meeting_title}</Text> */}
                <Text>{item.attendees[0].user_id}</Text>
                {/* <Text>{item?.documents[0]?.file_extension}</Text> */}
              </View>
            </>
          );
        }}
        onEndReached={() => {
          //   console.log('load more');
          //   setPage(page + 1);
          handleMeetingList(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <ActivityIndicator size={'large'} color={'rosybrown'} />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddMeeting')}
      />
    </>
  );
};

export default Meeting;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
