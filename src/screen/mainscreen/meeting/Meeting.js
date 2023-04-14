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
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import TextButton from '../../../components/TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import {useCustomHook} from '../../theme/ThemeContext';
import {Switch} from 'react-native';

const Meeting = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const {dark, color, themeFunction} = useCustomHook();

  //   console.log('token', token);

  const {navigation} = props;
  const [listState, setListState] = useState([]);
  const [filterData, setFilterData] = useState({}); //filter data
  const [filterModal, setFilterModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState('1');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [pageRe, setPageRe] = useState(false);

  const ToggleThemeFunction = () => {
    dark ? themeFunction('light') : themeFunction('dark');
  };

  const handleMeetingList = async (page, refresh) => {
    const url = constants.endPoint.meetingList;
    const params = {
      page: page ? page : 1,
      per_page_record: '10',
    };
    const result = await ApiMethod.postData(url, params, token);
    //   console.log('result', result?.data?.data, 'url', url);

    if (result) {
      setLoader(true);
      if (!page) {
        setPage(1);
        setListState(result?.data?.data?.data);
        setLoader(false);
        if (!refresh) setIsRefreshing(false);
      } else {
        let temp = [...listState];
        temp = temp.concat(result?.data?.data?.data);
        setPage(page);
        setListState([...temp]);
        setPageRe(false);
      }
    } else {
      if (!page) setLoader(false);
      else setPageRe(false);
      if (refresh) setIsRefreshing(false);
      ToastAndroid.show('error in pagination', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    handleMeetingList();
  }, []);

  return (
    <>
      <Header textHeader={'Meeting List '} />
      <Switch
        style={{position: 'absolute', alignSelf: 'flex-end', padding: 15}}
        value={dark}
        onValueChange={ToggleThemeFunction}
        trackColor={!dark ? COLORS.light : COLORS.dark}
        thumbColor={!dark ? COLORS.dark : COLORS.light}
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-evenly',
          backgroundColor: dark ? COLORS.light : COLORS.dark,
        }}
      >
        <TextButton
          label={'Active'}
          contentContainerStyle={{
            height: 45,
            backgroundColor:
              activeStatus == '1' ? COLORS.primary : COLORS.grey80,
            paddingHorizontal: 50,
            borderRadius: 50,
            width: '40%',
          }}
          labelStyle={{
            color: activeStatus == '1' ? COLORS.light : COLORS.primary,
            ...FONTS.h4,
            fontWeight: '500',
            fontSize: 18,
          }}
          onPress={() => setActiveStatus('1')}
        />

        <TextButton
          label={'Inactive'}
          contentContainerStyle={{
            height: 45,
            backgroundColor:
              activeStatus == '2' ? COLORS.secondary : COLORS.grey80,
            // paddingHorizontal: 50,
            borderRadius: 50,
            width: '40%',
          }}
          labelStyle={{
            color: activeStatus == '2' ? COLORS.light : COLORS.secondary,
            ...FONTS.h4,
            fontWeight: '500',
            fontSize: 20,
          }}
          onPress={() => setActiveStatus('2')}
        />
        <TouchableOpacity
          onPress={() => setFilterModal(!filterModal)}
          style={{
            height: 45,
            backgroundColor: COLORS.light,
            paddingHorizontal: 10,
            borderRadius: 18,
            width: '15%',
            alignItems: 'center',
          }}
        >
          <Ionicons
            style={{paddingTop: 8}}
            name="filter-sharp"
            size={25}
            color={'black'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{backgroundColor: dark ? COLORS.light : COLORS.dark}}
        data={
          Array.isArray(listState)
            ? listState.filter(e => e.status == activeStatus)
            : []
        }
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
          const meetingDateFormate = moment(item.meeting_date).format('L');
          const meetingTimeFormate = moment(item.meeting_time).format('LT');
          return (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: dark ? COLORS.secondary20 : COLORS.secondary,
                  margin: 10,
                  borderRadius: SIZES.radius,
                  padding: SIZES.padding,
                  borderLeftWidth: 5,
                  borderLeftColor:
                    activeStatus == '1' ? COLORS.primary : COLORS.secondary,
                }}
                onPress={() => navigation.navigate('ViewMeeting', item)}
              >
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: '85%',
                      color: COLORS.primary,
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      ...FONTS.font1,
                    }}
                  >
                    {item.meeting_title}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...FONTS.base, fontWeight: '500'}}>
                    {item.meeting_ref_no}
                  </Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Text
                    numberOfLines={3}
                    style={{...FONTS.body4, fontWeight: '500', height: 75}}
                  >
                    {item.agenda_of_meeting}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{...FONTS.font1, fontWeight: '600', color: 'black'}}
                  >
                    {meetingDateFormate}
                  </Text>
                  <Text
                    style={{...FONTS.font1, fontWeight: '600', color: 'black'}}
                  >
                    {meetingTimeFormate}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
        onEndReached={() => {
          handleMeetingList(page + 1, null, true);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            <View style={{marginTop: 22}}>
              <ActivityIndicator size={'large'} color={'rosybrown'} />
            </View>
          );
        }}
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
