import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import {FAB} from 'react-native-paper';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {Modal} from 'react-native';
import MeetingFilter from './MeetingFilter';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const Meeting = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  console.log('token', token);

  const {navigation} = props;
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState({}); //filter data
  const [filterModal, setFilterModal] = useState(false);
  const [iconModal, setIconModal] = useState('');

  const handleMeetingList = async () => {
    const url = constants.endPoint.meetingList;
    const params = {
      page: 1,
      per_page_record: '10',
    };
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data, 'url', url);
      setListState(result?.data?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleMeetingList();
  }, [page]);

  console.log('listState', listState);
  return (
    <>
      <Header
        userName={'Niharika'}
        userTitle={'manager'}
        searchBar={true}
        rightIcon={true}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
        onPressSort={() => setFilterModal(!filterModal)}
        userProfile={true}
      />

      <FlatList
        // data={listState}
        data={Array.isArray(listState) ? listState : []}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              handleMeetingList(null, true);
            }}
          />
        }
        renderItem={({item, index}) => {
          //   console.log('item', item?.documents[0]?.uploading_file_name);
          const createdDateFormate = moment(item.created_at).format('L');
          const meetingDateFormate = moment(item.meeting_date).format('L');
          const meetingTimeFormate = moment(item.meeting_time).format('LT');
          return (
            <>
              <View
                style={{
                  backgroundColor: COLORS.support3_08,
                  margin: 10,
                  borderRadius: SIZES.radius,
                  padding: SIZES.padding,
                  //   elevation: 1,
                  borderWidth: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate('ViewMeeting', item)}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    // marginRight: 25,
                    padding: 20,
                    backgroundColor: COLORS.light,
                    borderBottomLeftRadius: 40,
                    elevation: 2,
                  }}
                >
                  <AntDesign name="eyeo" size={30} color={COLORS.dark} />
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{width: '50%', ...FONTS.base, fontWeight: '700'}}
                  >
                    Title:{' '}
                  </Text>
                  <Text style={{width: '50%'}}>{item.meeting_title}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{width: '50%', ...FONTS.base, fontWeight: '700'}}
                  >
                    Reference:{' '}
                  </Text>
                  <Text style={{width: '50%'}}>{item.meeting_ref_no}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{width: '50%', ...FONTS.base, fontWeight: '700'}}
                  >
                    Meeting Date:{' '}
                  </Text>
                  <Text>{meetingDateFormate}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{width: '50%', ...FONTS.base, fontWeight: '700'}}
                  >
                    Meeting Time:{' '}
                  </Text>
                  <Text>{meetingTimeFormate}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{width: '50%', ...FONTS.base, fontWeight: '700'}}
                  >
                    Created At:{' '}
                  </Text>
                  <Text>{createdDateFormate}</Text>
                </View>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setFilterModal(!filterModal);
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
          }}
        >
          <View
            style={{
              marginBottom: 20,
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <MeetingFilter
              filterData={filterData}
              setFilterModal={setFilterModal}
              filterModal={filterModal}
            />
          </View>
        </View>
      </Modal>
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
