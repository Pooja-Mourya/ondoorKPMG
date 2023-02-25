import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../../components/FormInput';
import {SIZES, COLORS, FONTS, constants} from '../../../constants';
import TextButton from '../../../components/TextButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import CheckBox from '../../../components/CheckBox';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';

const data = [
  {id: '1', duration: 'Every day'},
  {id: '2', duration: 'Every week'},
  {id: '3', duration: 'Every month'},
];

const AddMeeting = () => {
  const token = useSelector(state => state?.user?.user);

  const [selectImage, setSelectImage] = useState([]);
  const [enableCheck, setEnableCheck] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [user, setUser] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [isUploadLoading, setIsUploading] = useState(false);
  const [state, setState] = useState({
    meeting_title: '',
    meeting_date: '',
    meeting_time: '',
    meeting_ref_no: '',
    agenda_of_meeting: '',
    is_repeat: data.id,
    eventNumber: 0,
    attendees: [user.email],
    documents: [selectImage.uri],
    inviteEmail: '',
  });

  const onChange = (event, selectedData) => {
    const currentDate = selectedData || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    let fTime =
      'Hours:' + tempDate.getHours() + '| Minutes:' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime);
    // console.log('first', fDate + '\n' + fTime);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  //   const uploadFile = async () => {
  //     try {
  //       let url = constants.endPoint.uploadFile;
  //       let params = {};
  //       const result = await ApiMethod.uploadFileServices(url, params, token);
  //       console.log('result', result);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  const uploadFile = async singleFile => {
    // if (singleFile != null) {
    //   console.log('singleFile', singleFile);

    setIsUploading(true);
    let url = constants.endPoint.uploadFile;
    let res = await ApiMethod.uploadFileServices(
      url,
      singleFile,
      token,
      'CSV_',
      'no_multiple',
      'csv Attachment',
    );

    console.log('response', res);

    if (res.errorMsg) {
      Alert.alert('Constants.danger, res.errorMsg');
      setIsUploading(false);
      return null;
    } else {
      Alert.alert(' Constants.labels.message_uploaded_successfully,');
      if (res?.data?.file) setUploadFiles(res?.data?.file);
      setIsUploading(false);
    }
    // }
  };

  const submitHandle = async () => {
    const url = constants.endPoint.meeting;
    console.log('submit');

    return;
    const params = {
      meeting_title: state.meeting_title,
      meeting_date: state.meeting_date,
      meeting_time: '05:28',
      meeting_ref_no: '0000',
      agenda_of_meeting: 'null',
      is_repeat: 'fdfd',
      attendees: 'ff',
      documents: 'gg',
    };

    console.log('params', params);

    try {
      const result = await ApiMethod.postData(url, params, token);
      //   return;
      if (result?.data?.data?.access_token) {
        navigation.navigate('Meeting');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onDelete = value => {
    const data = selectImage.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setSelectImage(data);
  };

  const ListUser = async () => {
    const url = constants.endPoint.userList;
    const params = {};

    try {
      const result = await ApiMethod.postData(url, params, token);
      //   console.log('userResult', result?.data?.data);
      setUser(result?.data?.data);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    ListUser();
  }, []);

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onlyDate = moment(date).format('L');
  const onlyTime = moment(date).format('LT');

  const selectFile = async options => {
    try {
      const res = await DocumentPicker.pickMultiple(options);
      setSelectImage(res);
      //   return;
      if (singleFile <= 10000) {
        uploadFile(res);
      }
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
      }
    }
  };

  //   console.log('state', state);
  //   console.log('date', onlyDate);
  //   console.log('time', onlyTime);

  if (isUploadLoading) return <ActivityIndicator />;
  return (
    <>
      <Header textHeader={'Create Meeting'} leftIcon={true} rightIcon={true} />
      <View
        style={{
          backgroundColor: COLORS.support3_08,
          flex: 1,
          padding: SIZES.padding,
          margin: 10,
          borderRadius: SIZES.radius,
        }}
      >
        <Text style={{...FONTS.body2, fontSize: SIZES.h2}}>Basic Details</Text>
        <Text>Enter basic details of the meeting</Text>
        <KeyboardAwareScrollView>
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Title"
            value={state.meeting_title}
            onChange={m => onchangeState('meeting_title', m)}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                marginTop: 10,
                width: '48%',
              }}
              placeholder="Meeting Date"
              value={onlyDate}
              onChange={d => {
                console.log('25/02/2023', d);
                onchangeState('meeting_date', d);
              }}
              appendComponent={
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Fontisto name={'date'} size={25} color={COLORS.primary} />
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
              placeholder="Meeting Time"
              value={onlyTime}
              onChange={t => {
                console.log('meeting_time', t);
                onchangeState('meeting_time', t);
              }}
              appendComponent={
                <TouchableOpacity onPress={() => setOpenTime(true)}>
                  <AntDesign
                    name={'clockcircleo'}
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting reference no."
            value={state.meeting_ref_no}
            onChange={r => onchangeState('meeting_ref_no', r)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Agenda of meeting"
            value={state.agenda_of_meeting}
            numberOfLines={10}
            onChange={o => onchangeState('agenda_of_meeting', o)}
          />
          <View style={{marginHorizontal: 12}}>
            <CheckBox
              CheckBoxText={'Enable Repeat'}
              containerStyle={{backgroundColor: '', lineHeight: 20}}
              isSelected={enableCheck}
              onPress={() => setEnableCheck(!enableCheck)}
            />
          </View>
          {enableCheck == true ? (
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="duration"
                valueField="id"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={state.is_repeat}
                onChange={item => {
                  onchangeState('is_repeat', item);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />

              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                  marginTop: 10,
                }}
                placeholder="Event Number"
                value={state.eventNumber}
                onChange={a => onchangeState('eventNumber', a)}
                keyboardType="number"
              />
              {state.eventNumber === Number ? null : (
                <Text
                  style={{
                    color: state.eventNumber === Number ? COLORS.error : 'grey',
                  }}
                >
                  this field is required
                </Text>
              )}
              <Text
                style={{
                  ...FONTS.body3,
                  fontSize: SIZES.h3,
                  textAlign: 'center',
                  marginVertical: 10,
                  fontWeight: '900',
                  color: COLORS.primary,
                }}
              >
                The meeting will be repeated for {state.eventNumber} Days
              </Text>
            </View>
          ) : null}
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={user}
            labelField="email"
            valueField="id"
            placeholder="Select attendees"
            searchPlaceholder="Search..."
            value={state.attendees}
            onChange={item => {
              onchangeState('attendees', item);
            }}
          />

          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Add Invitational Email"
            value={state.inviteEmail}
            onChange={invitation => onchangeState('inviteEmail', invitation)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Upload Document"
            value={state.documents}
            onChange={d => onchangeState('document', d)}
            appendComponent={
              <AntDesign
                name={'upload'}
                size={30}
                color={COLORS.primary}
                onPress={() => selectFile()}
              />
            }
          />
          <View>
            <FlatList
              data={selectImage}
              keyExtractor={(item, index) =>
                (item?.filename ?? item?.path) + index
              }
              renderItem={({item}) => {
                // console.log('item', item);
                return (
                  <View style={{}}>
                    <Image
                      width={250}
                      source={{uri: item.uri}}
                      style={{
                        width: 100,
                        height: 100,
                        flex: 1,
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => onDelete(item)}
                      activeOpacity={0.9}
                      style={{position: 'absolute', padding: 5}}
                    >
                      <Text style={{}}>
                        <AntDesign name="delete" color={'red'} size={20} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              numColumns={3}
              style={{
                height: selectImage != '' ? 200 : 1,
                borderWidth: 1,
                backgroundColor: COLORS.light,
                marginVertical: 10,
                borderRadius: SIZES.radius,
                padding: 10,
                display: !selectImage ? 'none' : 'flex',
              }}
            />
            <TextButton
              label={'upload Image'}
              contentContainerStyle={{
                backgroundColor: 'none',
                margin: 10,
              }}
              labelStyle={{
                color:
                  selectImage.length > 0 ? COLORS.primary : COLORS.primary60,
                ...FONTS.h4,
              }}
              onPress={selectImage.length > 0 ? () => uploadFile() : () => {}}
            />
          </View>
          <TextButton
            label={'Save'}
            contentContainerStyle={{
              height: 55,
              borderRadius: SIZES.radius,
              margin: 10,
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h4,
            }}
            onPress={() =>
              (state.eventNumber = state.eventNumber
                ? submitHandle()
                : Alert.alert('event number'))
            }
          />
        </KeyboardAwareScrollView>
      </View>
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
      {openTime ? (
        <DatePicker
          modal
          open={openTime}
          date={date}
          mode={'time'}
          onConfirm={date => {
            setOpenTime(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
      ) : null}
    </>
  );
};

export default AddMeeting;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 54,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
