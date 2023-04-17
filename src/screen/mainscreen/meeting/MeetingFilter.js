import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
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

const MeetingFilter = ({
  setFilterModal,
  setActiveStatus,
  activeStatus,
  handleMeetingList,
  setFilterState,
  filterState,
}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const formFilterKeys = {
    meeting_date: 'meeting_date',
    meeting_ref_no: 'meeting_ref_no',
    meeting_time_end: 'meeting_time_end',
    meeting_time_start: 'meeting_time_start',
    meeting_title: 'meeting_title',
    status: 'status',
  };

  const initialValue = {
    [formFilterKeys.meeting_date]: '',
    [formFilterKeys.meeting_ref_no]: '',
    [formFilterKeys.meeting_time_end]: '',
    [formFilterKeys.meeting_time_start]: '',
    [formFilterKeys.meeting_title]: '',
    [formFilterKeys.status]: '',
  };
  const [date, setDate] = useState(new Date());
  const [DPMode, setDPMode] = useState({key: '', mode: 'date'});
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialValue);

  const onChangeTextHandle = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
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
        value={state?.[formFilterKeys?.meeting_title] ?? ''}
        onChange={N => onChangeTextHandle(formFilterKeys?.meeting_title, N)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="MEETING REF NO."
        value={state?.[formFilterKeys?.meeting_ref_no] ?? ''}
        onChange={M => onChangeTextHandle(formFilterKeys?.meeting_ref_no, M)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="Meeting Date"
        value={state?.[formFilterKeys?.meeting_date] ?? ''}
        onChange={d => {
          onChangeTextHandle(formFilterKeys.meeting_date, d);
        }}
        appendComponent={
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
              setDPMode({key: formFilterKeys.meeting_date, mode: 'date'});
            }}
          >
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
          value={state?.[formFilterKeys?.meeting_time_start] ?? ''}
          onChange={d => {
            onChangeTextHandle(formFilterKeys.meeting_time_start, d);
          }}
          appendComponent={
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
                setDPMode({
                  key: formFilterKeys.meeting_time_start,
                  mode: 'time',
                });
              }}
            >
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
          value={state?.[formFilterKeys?.meeting_time_end] ?? ''}
          onChange={t => {
            onChangeTextHandle(formFilterKeys.meeting_time_end, t);
          }}
          appendComponent={
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
                setDPMode({key: formFilterKeys.meeting_time_end, mode: 'time'});
              }}
            >
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
          text={state?.[formFilterKeys?.status] ? 'Inactive' : 'Active'}
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
        onPress={() => {
          setFilterState(state);
          setFilterModal(false);
          //   state ? handleMeetingList() : [];
        }}
      />
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          mode={DPMode?.mode}
          onConfirm={date => {
            if (DPMode.key) {
              if (DPMode?.mode === 'date') {
                onChangeTextHandle(DPMode.key, moment(date).format('L'));
              } else {
                onChangeTextHandle(DPMode.key, moment(date).format('LTS'));
              }
            } else {
              ToastAndroid.show('key note found'.ToastAndroid.SHORT);
            }
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </View>
  );
};

export default MeetingFilter;

const styles = StyleSheet.create({});
