import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, constants, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import Header from '../../../components/layout/Header';
import {TouchableOpacity} from 'react-native';
import TextButton from '../../../components/TextButton';

const ViewNotes = props => {
  const token = useSelector(state => state?.user?.user);

  const {navigation, setViewModal, viewModal} = props;
  const [editData, setEditData] = useState({});

  let routeParm = props?.route?.params;

  console.log('routeParm', routeParm);

  return (
    <>
      <Header
        leftIcon={true}
        // onPressArrow={() => setFilterModal(!filterModal)}
        textHeader={'Notes Details'}
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
        <Text>{routeParm.meeting_id}</Text>
        <Text>{routeParm.duration}</Text>
        <Text>{routeParm.decision}</Text>
        <Text>{routeParm.created_by?.id}</Text>
        <Text>{routeParm.created_by?.email}</Text>
        <Text>{routeParm.created_by?.name}</Text>
        <Text>{routeParm.edited_by?.id}</Text>
        <Text>{routeParm.edited_by?.email}</Text>
        <Text>{routeParm.edited_by?.name}</Text>
        <Text>{routeParm.meeting?.meetRandomId}</Text>
        <Text>{routeParm.meeting?.meeting_title}</Text>
        <Text>{routeParm.meeting?.agenda_of_meeting}</Text>
        <Text>{routeParm.meeting?.meeting_date}</Text>
        <Text>{routeParm.meeting?.status}</Text>
        <Text>{routeParm.action_item?.[0]?.due_date}</Text>
        {/* <Image
          style={{width: 100, height: 100}}
          source={{
            uri:
              'https://graphicsfamily.com/wp-content/uploads/edd/2021/08/Free-Creative-Abstract-Logo-Design-Template-scaled.jpg',
          }}
        /> */}
        <TouchableOpacity>
          <TextButton
            label={'edit'}
            onPress={() => {
              navigation.navigate('AddNotes', routeParm);
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ViewNotes;

const styles = StyleSheet.create({});
