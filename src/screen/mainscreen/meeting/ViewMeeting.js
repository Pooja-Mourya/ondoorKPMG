import {StyleSheet, Text, View, Image, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, constants, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import Header from '../../../components/layout/Header';
import TextButton from '../../../components/TextButton';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ViewMeeting = props => {
  const token = useSelector(state => state?.user?.user);

  const {navigation} = props;
  let routeParm = props?.route?.params;

  console.log('routeParm', routeParm);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  //   const ViewMeetingAPI = async () => {
  //     let url = constants.endPoint.meeting;
  //     let params = {};

  //     const result = await ApiMethod.postData(url, params, token);
  //     console.log('ViewMeeting', result);
  //   };

  //   useEffect(() => {
  //     ViewMeetingAPI();
  //   }, []);

  const handleDelete = async id => {
    setIsRefreshing(true);

    try {
      let url = constants.endPoint.meeting + '/' + id;
      //   console.log('deleteUrl', url);
      //   return;
      const deleteResult = ApiMethod.deleteData(url, null, token);
      console.log('deleteResult', deleteResult);
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
        rightIcon={true}
        onPressSort={() => setFilterModal(true)}
      />
      <View
        style={{
          backgroundColor: COLORS.support3_08,
          padding: SIZES.padding,
          margin: 20,
          height: SIZES.height,
          borderRadius: SIZES.radius,
        }}
      >
        <Text>{routeParm.id}</Text>
        <Text>{routeParm.meeting_date}</Text>
        <Text>{routeParm.created_at}</Text>
        <Text>{routeParm.is_repeat}</Text>
        <Text>{routeParm.meeting_date}</Text>
        <Text>{routeParm.meeting_date}</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri:
              'https://graphicsfamily.com/wp-content/uploads/edd/2021/08/Free-Creative-Abstract-Logo-Design-Template-scaled.jpg',
          }}
        />
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
            // flex: 1,
            width: '30%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.light,
            alignSelf: 'flex-end',
            marginTop: 65,
            marginHorizontal: 20,
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
          <TouchableOpacity onPress={() => handleDelete(id)}>
            <AntDesign name="delete" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ViewMeeting;

const styles = StyleSheet.create({});
