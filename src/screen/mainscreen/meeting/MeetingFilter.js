import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/layout/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import TextButton from '../../../components/TextButton';
import FormInput from '../../../components/FormInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';

const MeetingFilter = ({setFilterModal}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [state, setState] = useState({
    meeting_date: '',
    meeting_ref_no: '',
    meeting_time_end: '',
    meeting_time_start: '',
    meeting_title: '',
    status: '',
  });
  const onChangeTextHandle = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmitFilterHandler = async () => {
    let url = constants.endPoint.meetingList;
    let params = {
      meeting_date: state.meeting_date,
      meeting_ref_no: state.meeting_ref_no,
      meeting_time_end: state.meeting_time_end,
      meeting_time_start: state.meeting_time_start,
      meeting_title: state.meeting_title,
      status: state.status == 1 ? 'active' : 'inactive',
    };

    try {
      const filterRes = await ApiMethod.postData(url, params, token);
      console.log('filterRes', filterRes);
      if (filterRes) {
        // navigation.navigate('Meeting');
        setFilterModal(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            backgroundColor: COLORS.light20,
            borderRadius: 50,
            padding: 5,
            elevation: 1,
          }}
          onPress={() => setFilterModal(false)}
        >
          <Text>
            <AntDesign name="close" size={30} color={COLORS.dark} />
          </Text>
        </TouchableOpacity>

        <Text style={{fontSize: SIZES.h2, padding: 10}}>Filter Meeting</Text>
      </View>
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
        }}
        placeholder="MEETING TITLE"
        value={state.meeting_title}
        onChange={N => onChangeTextHandle('meeting_title', N)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="MEETING REF NO."
        value={state.meeting_ref_no}
        onChange={M => onChangeTextHandle('meeting_ref_no', M)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="Meeting Date"
        value={state.meeting_date}
        onChange={d => {
          onChangeTextHandle('meeting_date', d);
        }}
        appendComponent={
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Fontisto name={'date'} size={25} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
            width: '48%',
          }}
          placeholder="time start"
          value={state.meeting_time_start}
          onChange={d => {
            onChangeTextHandle('meeting_time_start', d);
          }}
          appendComponent={
            <TouchableOpacity onPress={() => setOpenStart(true)}>
              <AntDesign
                name={'clockcircleo'}
                size={25}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
            width: '48%',
          }}
          placeholder="time end"
          value={state.meeting_time_end}
          onChange={t => {
            onChangeTextHandle('meeting_time_end', t);
          }}
          appendComponent={
            <TouchableOpacity onPress={() => setOpenTime(true)}>
              <Entypo name={'clock'} size={28} color={COLORS.primary} />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={{marginTop: 10}}>
        <BouncyCheckbox
          size={25}
          fillColor={COLORS.dark}
          unfillColor="#FFFFFF"
          text={state.status ? 'Inactive' : 'Active'}
          iconStyle={{borderColor: COLORS.support1}}
          innerIconStyle={{borderWidth: 2}}
          textStyle={{fontFamily: 'JosefinSans-Regular'}}
          onPress={s => onChangeTextHandle('status', s)}
        />
      </View>

      <TextButton
        label={'Filter Meeting'}
        contentContainerStyle={{
          height: 55,
          borderRadius: SIZES.radius,
          marginVertical: 10,
        }}
        labelStyle={{
          color: COLORS.light,
          ...FONTS.h4,
        }}
        onPress={() => onSubmitFilterHandler()}
      />
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            onChangeTextHandle('meeting_date', moment(date).format('L'));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
      {openStart ? (
        <DatePicker
          modal
          open={openStart}
          date={date}
          mode={'time'}
          onConfirm={date => {
            setOpenStart(false);
            setDate(date);
            onChangeTextHandle(
              'meeting_time_start',
              moment(date).format('LTS'),
            );
          }}
          onCancel={() => {
            setOpenStart(false);
          }}
        />
      ) : null}
      {openTime ? (
        <DatePicker
          modal
          open={openTime}
          date={date}
          mode={'time'}
          onConfirm={date => {
            setOpenTime(false);
            setDate(date);
            onChangeTextHandle('meeting_time_end', moment(date).format('LTS'));
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
      ) : null}
    </View>
  );
};

export default MeetingFilter;

const styles = StyleSheet.create({});
