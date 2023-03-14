import {StyleSheet, Text, View, Image, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RadioButton} from 'react-native-paper';
import TextButton from '../../../components/TextButton';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {
    id: '1',
    sta: 'active',
  },
  {
    id: '2',
    sta: 'inactive',
  },
];
const ViewMeeting = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const {navigation} = props;
  let routeParm = props?.route?.params;

  //   console.log('routeParm', routeParm);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [listState, setListState] = useState([]);
  const [checked, setChecked] = useState(false);

  //   const ViewMeetingAPI = async id => {
  //     let url = constants.endPoint.meeting + '/' + id;
  //     const result = await ApiMethod.getData(url, null, token);
  //     console.log('ViewMeeting', result);
  //   };

  //   useEffect(() => {
  //     ViewMeetingAPI();
  //   }, []);

  const MeetingAction = async () => {
    const url = constants.endPoint.meetingAction;
    const params = {
      ids: [routeParm.id],
      action: checked,
    };
    try {
      const mitActionRes = await ApiMethod.postData(url, params, token);
      if (mitActionRes) {
        Alert.alert('meeting Action Update Successfully');
      }
      setChecked(false);
      setFilterModal(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleActionAlert = () => {
    Alert.alert(`activate ${routeParm.meeting_title}`, '', [
      {
        text: 'no',
        onPress: () => {
          console.log('no');
        },
      },
      {
        text: 'yes',
        onPress: () => MeetingAction(),
      },
    ]);
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

  if (isRefreshing) return <ActivityIndicator />;
  return (
    <>
      <Header
        leftIcon={true}
        onPressArrow={() => navigation.navigate('Meeting')}
        textHeader={'Meeting Details'}
      />
      <View
        style={{
          height: SIZES.height,
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
          backgroundColor: COLORS.support3_08,
        }}
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
            <Text>{routeParm.id}</Text>
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
            <Text>{routeParm.meeting_title}</Text>
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
            <Text>{routeParm.meeting_date}</Text>
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
            <Text>{moment(routeParm.created_at).format('L')}</Text>
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
            <Text>{routeParm.is_repeat == 1 ? 'Active' : 'Inactive'}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                marginTop: 10,
              }}
            >
              Meeting Date | Time
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{moment(routeParm.meeting_date).format('L')} / </Text>
              <Text> {routeParm.meeting_time}</Text>
            </View>
          </View>

          {/* <Image
          style={{width: 100, height: 100}}
          source={{
            uri:
              'https://graphicsfamily.com/wp-content/uploads/edd/2021/08/Free-Creative-Abstract-Logo-Design-Template-scaled.jpg',
          }}
        /> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <TouchableOpacity
            style={{paddingBottom: 20}}
            onPress={() => {
              navigation.navigate('AddMeeting', routeParm);
            }}
          >
            <AntDesign name="edit" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(routeParm.id)}>
            <AntDesign name="delete" size={20} color={COLORS.error} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterModal(true)}>
            <MaterialCommunityIcons
              name="list-status"
              size={20}
              color={COLORS.error}
            />
          </TouchableOpacity>
        </View>
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
            backgroundColor: COLORS.light20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{backgroundColor: COLORS.success, width: '80%'}}>
            <Text> id : {routeParm.id}</Text>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value={routeParm.status}
                status={checked === routeParm.status ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />
              <Text style={{marginTop: 8}}>
                {!checked ? 'Active' : 'inactive'}
              </Text>
            </View>
            <TextButton
              label={'submit'}
              contentContainerStyle={{
                padding: 10,
                borderRadius: SIZES.radius,
              }}
              onPress={() => handleActionAlert()}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ViewMeeting;

const styles = StyleSheet.create({});
