import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, constants, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import Header from '../../../components/layout/Header';

const ViewMeeting = (props, {navigation}) => {
  const token = useSelector(state => state?.user?.user);

  let routeParm = props?.route?.params;

  console.log('routeParm', routeParm);

  const ViewMeetingAPI = async () => {
    let url = constants.endPoint.meeting;
    let params = {};

    const result = await ApiMethod.postData(url, params, token);
    console.log('ViewMeeting', result);
  };

  useEffect(() => {
    ViewMeetingAPI();
  }, []);
  return (
    <>
      <Header
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
        textHeader={'Meeting Details'}
      />
      <View
        style={{
          backgroundColor: COLORS.support3_08,
          padding: SIZES.padding,
          margin: 20,
          height: SIZES.height,
          borderRadius: SIZES.radius,
        }}
      ></View>
      <Text>meeting</Text>
      <Text>{routeParm.id}</Text>
      <Text>{routeParm.meeting_date}</Text>
      <Text>{routeParm.created_at}</Text>
      <Text>{routeParm.is_repeat}</Text>
      <Text>{routeParm.meeting_date}</Text>
      <Text>{routeParm.meeting_date}</Text>
    </>
  );
};

export default ViewMeeting;

const styles = StyleSheet.create({});
