import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Alert,
  Linking,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import Header from '../../../components/layout/Header';
// import TextButton from '../../../components/TextButton';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import TextButton from '../../../components/TextButton';
import axios from 'axios';

const ViewMeeting = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const {navigation} = props;
  let routeParm = props?.route?.params;

  //   console.log('routeParm', routeParm);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [listState, setListState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [getMeet, setGetMeet] = useState({});

  //   console.log('routeParm', routeParm);
  const MeetingAction = async () => {
    const url = constants.endPoint.meetingAction;
    const params = {
      ids: [routeParm.id],
      action: routeParm.status === 1 ? 'inactive' : 'active',
    };

    console.log('actionParams', params);
    try {
      const mitActionRes = await ApiMethod.postData(url, params, token);
      if (mitActionRes) {
        Alert.alert('meeting Action Update Successfully');
      }

      setFilterModal(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getMeetingList = async () => {
    const url = constants.endPoint.meeting + '/' + routeParm.id;
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.getData(url, token, null);
      console.log('GetResult', result.data.data, 'url', url);

      setGetMeet(result?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

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

  const handleDelete = async id => {
    setIsRefreshing(true);
    try {
      let url = constants.endPoint.meeting + '/' + id;
      const deleteResult = ApiMethod.deleteData(url, null, token);
      console.log('deleteResult', deleteResult.json());
      navigation.navigate('Meeting');
      handleMeetingList();
      setIsRefreshing(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.log('routeParm', routeParm);
    }, 1000);
  }, []);

  console.log('getMeeting', getMeet);
  useEffect(() => {
    //   if (routeParm || MeetingAction()) {
    //     handleMeetingList();
    //   }
    getMeetingList();
  }, []);
  if (isRefreshing) return <ActivityIndicator />;
  return (
    <>
      <Header
        leftIcon={true}
        onPressArrow={() => navigation.navigate('Meeting')}
        textHeader={'Meeting Details'}
      />
      <ScrollView
        style={{
          height: SIZES.height,
          flexDirection: 'column',
          backgroundColor: COLORS.support3_08,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
              //   handleMeetingList();
            }}
          />
        }
      >
        <View
          style={{
            padding: SIZES.padding,
            margin: 20,
            borderRadius: SIZES.radius,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                marginTop: 10,
              }}
            >
              User Id
            </Text>
            <Text>{getMeet.id}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                marginTop: 10,
              }}
            >
              Title
            </Text>
            <Text>{getMeet.meeting_title}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                marginTop: 10,
              }}
            >
              Meeting Date
            </Text>
            <Text>{getMeet.meeting_date}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                marginTop: 10,
              }}
            >
              Created At
            </Text>
            <Text>{moment(getMeet.created_at).format('L')}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                marginTop: 10,
              }}
            >
              Status
            </Text>
            <View
              style={{
                backgroundColor: getMeet.status == 1 ? 'green' : 'red',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 25,
              }}
            >
              <Text style={{marginTop: 0, color: COLORS.light}}>
                {getMeet.status == 1 ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>

          <Text
            style={{
              ...FONTS.base,
              color: COLORS.dark,
              fontSize: SIZES.h3,
              marginTop: 10,
            }}
          >
            Agenda of Meeting :
          </Text>
          <Text>{getMeet?.agenda_of_meeting}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Render Id:
            </Text>
            <Text>{getMeet?.meetRandomId}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Meeting Reference :
            </Text>
            <Text>{getMeet?.meeting_ref_no}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Meeting File :
            </Text>
            <Text onPress={() => Linking.openURL(getMeet.invite_file)}>
              {getMeet?.invite_file}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Meeting link :
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(getMeet.meeting_link)}
              >
                meeting link
              </Text>
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Meeting Date | Time
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{moment(getMeet.meeting_date).format('L')}</Text>
              <Text> {moment(getMeet.meeting_time).format('LST')}</Text>
            </View>
          </View>
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.primary,
              fontSize: SIZES.h3,
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            Attendees
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                textAlign: 'right',
              }}
            >
              Created At:
            </Text>
            <Text>{moment(getMeet.created_at).format('L')}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                textAlign: 'right',
              }}
            >
              Update At:
            </Text>
            <Text>{moment(getMeet.updated_at).format('L')}</Text>
          </View>
          {/* <FlatList
            data={getMeet.attendees}
            keyExtractor={({n, i}) => {
              return (
                <View key={i} style={{}}>
                  <Text>
                    Name :<Text style={{}}>{n.user.name}</Text>
                  </Text>
                  <Text>
                    Email : <Text>{n.user.email}</Text>
                  </Text>
                </View>
              );
            }}
          /> */}
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.primary,
              fontSize: SIZES.h3,
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            Organizer
          </Text>

          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Organizer Name :
            </Text>
            <Text style={{width: '70%'}}>
              {!getMeet.organiser.name
                ? '______________'
                : getMeet.organiser.name}
            </Text>
          </View> */}

          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
              }}
            >
              Organizer email :
            </Text>
            <Text style={{width: '70%'}}>
              {getMeet.organiser.email
                ? '_________________'
                : getMeet.organiser.email}
            </Text>
          </View> */}

          {/* <Text>
            Documents : <Text>{getMeet.documents}</Text>
          </Text> */}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{paddingBottom: 20}}
          onPress={() => {
            navigation.navigate('AddMeeting', getMeet);
          }}
        >
          <AntDesign name="edit" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterModal(true)}>
          <MaterialCommunityIcons
            name="list-status"
            size={20}
            color={COLORS.error}
          />
        </TouchableOpacity>
      </View>
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
            backgroundColor: COLORS.light60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.secondary,
              width: '80%',
              padding: 30,
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{...FONTS.font1, fontSize: 18, textAlign: 'center'}}>
              {' '}
              id : {getMeet.id}
            </Text>
            <View
              style={{
                padding: 10,
              }}
            >
              <View
                style={{
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{
                    marginTop: 0,
                    color: getMeet.status == 2 ? 'green' : 'red',
                    ...FONTS.font1,
                    fontSize: 18,
                  }}
                >
                  {!getMeet.status == 2 ? `Activated` : 'Deactivated'}
                </Text>
                <Text style={{...FONTS.font1, fontSize: 18}}>
                  {getMeet.meeting_title}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <TextButton
                label={'yes'}
                contentContainerStyle={{
                  padding: 10,
                  borderRadius: SIZES.radius,
                  width: '40%',
                }}
                onPress={() => MeetingAction()}
              />
              <TextButton
                label={'no'}
                contentContainerStyle={{
                  padding: 10,
                  borderRadius: SIZES.radius,
                  width: '40%',
                }}
                onPress={() => setFilterModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ViewMeeting;

const styles = StyleSheet.create({});
