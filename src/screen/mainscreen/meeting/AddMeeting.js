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
  Keyboard,
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
import DocumentPicker, {types} from 'react-native-document-picker';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import {ToastAndroid} from 'react-native';
import {useCustomHook} from '../../theme/ThemeContext';

const data = [
  {id: '1', duration: 'Every day'},
  {id: '2', duration: 'Every week'},
  {id: '3', duration: 'Every month'},
];

const AddMeeting = props => {
  const {navigation} = props;

  const editMeeting = props.route.params;

  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  const [dPValues, setDPValues] = useState({mode: 'date', key: ''});
  const [enableCheck, setEnableCheck] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [user, setUser] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [isUploadLoading, setIsUploading] = useState(false);
  const [state, setState] = useState({
    meeting_title: '',
    meeting_date: '',
    meeting_time: '',
    meeting_ref_no: '',
    agenda_of_meeting: '',
    is_repeat: '',
    eventNumber: '',
    attendees: '',
    documents: '',
    inviteEmail: '',
    checkValidEmail: false,
    is_multiple: '',
    meeting_time_end: '',
    meeting_time_start: '',
    meeting_link: '',
  });
  const [inputRecode, setInputRecode] = useState(false);

  const uniEmail = invitation => {
    const flag = user.find(i => i.email === invitation);
    return flag;
  };

  const AddEmailFunction = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const invitation = state.inviteEmail;
    onchangeState('attendees', [...state.attendees, invitation]);
    const u = user;
    if (invitation.match(reg)) {
      if (!uniEmail(invitation)) {
        u.push({
          id: invitation,
          email: invitation,
        });
        setUser([...u]);
      } else {
        ToastAndroid.show('email already exist');
      }
    } else {
      Alert.alert('invalid');
    }
  };

  const submitHandle = async () => {
    const url = constants.endPoint.meeting;
    const params = {
      meeting_title: state.meeting_title,
      meeting_date: state.meeting_date,
      meeting_time_end: state.meeting_time_end,
      meeting_time_start: state.meeting_time_start,
      meeting_ref_no: state.meeting_ref_no,
      agenda_of_meeting: state.agenda_of_meeting,
      meeting_link: state.meeting_link,
      is_repeat: state.is_repeat,
      attendees: state.attendees?.map(e => ({
        email: e,
      })),
      documents: [
        {
          file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
          file_extension: '',
          file_name: '',
          uploading_file_name: '',
        },
      ],
      //   documents: uploadFiles,
    };
    try {
      const result = await ApiMethod.postData(url, params, token);
      //   return;
      if (result?.data?.data?.access_token) {
        navigation.navigate('Meeting');
      }
      navigation.navigate('Meeting');
    } catch (error) {
      Alert.alert('error', error);
    }
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
      Alert.alert('error', error);
    }
  };

  const updateMeeting = async () => {
    let url = constants.endPoint.meeting + '/' + editMeeting.id;
    let params = {};

    try {
      const updateRes = await ApiMethod.putData(url, params, token);
      if (updateRes) {
        navigation.navigate('Meeting');
      }
    } catch (error) {}
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

  const onErrorChange = (name, value) => {
    setInputRecode(error => ({
      ...error,
      [value]: name,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!state.meeting_title) {
      onErrorChange('this field is required ', 'meeting_title');
      isValid = false;
    }
    if (!state.meeting_date) {
      onErrorChange('this field is required', 'meeting_date');
      isValid = false;
    }
    if (!state.meeting_time_end) {
      onErrorChange('this field is required', 'meeting_time_end');
      isValid = false;
    }
    if (!state.meeting_time_start) {
      onErrorChange('this field is required', 'meeting_time_start');
      isValid = false;
    }
    if (!state.attendees) {
      onErrorChange('this field is required', 'attendees');
      isValid = false;
    }
    // if (!state.meeting_link) {
    //   onErrorChange('this field is required', 'meeting_link');
    //   isValid = false;
    // } else if (state.meeting_link == state.meeting_link.includes('https://')) {
    //   isValid = false;
    // } else {
    //   Alert.alert('incorrect meeting url');
    // }
    if (isValid) {
      return isValid;
    }
  };

  const uploadFile = async imagePath => {
    let url = constants.base_url + constants.endPoint.uploadFile;
    let formDataRes = new FormData();
    formDataRes.append('is_multiple', 1);
    imagePath?.map((e, i) => {
      let obj = e;
      if (!obj.size) {
        obj['size'] = e.fileSize;
      }
      if (!e?.name) {
        obj['name'] =
          e.fileName ?? e.uri.substr(e.uri.lastIndexOf('/'), e.uri.length);
      }
      //   if (!e?.value) {
      //     obj['value'] = e?.uri;
      //   }
      formDataRes.append(`file[${i}]`, obj);
    });
    let headers = {
      Accept: '*/*',
      'content-type': 'multipart/form-data',
    };

    if (token) headers['Authorization'] = 'Bearer ' + token;

    let config = {
      headers: headers,
    };

    console.log('url', url);
    console.log('formDataRes', formDataRes);
    console.log('headers', headers);
    let imageResponse = '';
    try {
      imageResponse = await axios.post(url, formDataRes, config);
      console.log('imageResponse', imageResponse);
      setUploadFiles(imageResponse);
    } catch (error) {
      console.log('error', error);
      console.log('imageResponse', imageResponse);
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [types.doc, types.docx],
      });
      console.log('res', res);
      setSelectImage(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('cancelled');
      } else if (isInProgress(err)) {
        console.warn(
          'multiple pickers were opened, only the last will be considered',
        );
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    if (editMeeting) {
      setState({
        ...state,
        meeting_title: editMeeting.meeting_title,
        meeting_date: editMeeting.meeting_date,
        meeting_time_end: editMeeting.meeting_time_end,
        meeting_time_start: editMeeting.meeting_time_start,
        meeting_ref_no: editMeeting.meeting_ref_no,
        agenda_of_meeting: editMeeting.agenda_of_meeting,
        is_repeat: editMeeting.is_repeat,
        // attendees: editMeeting.attendees[0].email,
        attendees: editMeeting.attendees?.map(e => ({
          email: e,
        })),
        documents: [
          //   {
          //     file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
          //     file_extension: '',
          //     file_name: '',
          //     uploading_file_name: '',
          //   },
        ],
      });
    }
  }, []);

  if (isUploadLoading) return <ActivityIndicator />;
  return (
    <>
      <Header
        textHeader={editMeeting ? 'Edit Meeting' : 'Create Meeting'}
        leftIcon={true}
        onPressArrow={() => navigation.navigate('Meeting')}
      />
      <View
        style={{
          backgroundColor: COLORS.support3_08,
          flex: 1,
          padding: SIZES.padding,
          margin: 10,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            ...FONTS.body2,
            fontSize: SIZES.h2,
            color: dark ? COLORS.dark : COLORS.light,
          }}
        >
          Basic Details
        </Text>
        <Text style={{color: dark ? COLORS.dark : COLORS.light}}>
          Enter basic details of the meeting
        </Text>
        <KeyboardAwareScrollView>
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Title *"
            value={state.meeting_title}
            error={inputRecode.meeting_title}
            onChange={m => onchangeState('meeting_title', m)}
            onFocus={m => onErrorChange(m, 'meeting_title')}
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
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Link"
            value={state.meeting_link}
            onChange={r => onchangeState('meeting_link', r)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
              color: COLORS.dark,
            }}
            placeholderTextColor={COLORS.dark}
            placeholder="mm/dd/yyyy *"
            value={state.meeting_date}
            error={inputRecode.meeting_date}
            onChange={d => {
              onchangeState('meeting_date', d);
            }}
            onFocus={f => onErrorChange(f, 'meeting_date')}
            editable={false}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setDPValues({mode: 'date', key: 'meeting_date'});
                  setOpen(true);
                }}
              >
                <Fontisto name={'date'} size={25} color={COLORS.primary} />
              </TouchableOpacity>
            }
          />
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
              //   width: '48%',
            }}
            placeholder="time start * "
            editable={false}
            value={state.meeting_time_start}
            onChange={d => {
              onchangeState('meeting_time_start', d);
            }}
            onFocus={f => onErrorChange(f, 'meeting_time_start')}
            error={inputRecode.meeting_time_start}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setDPValues({mode: 'time', key: 'meeting_time_start'});
                  setOpen(true);
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
              //   width: '48%',
            }}
            placeholder="time end * "
            editable={false}
            value={state.meeting_time_end}
            onChange={d => {
              onchangeState('meeting_time_end', d);
            }}
            error={inputRecode.meeting_time_end}
            onFocus={f => onErrorChange(f, 'meeting_time_end')}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setDPValues({mode: 'time', key: 'meeting_time_end'});
                  setOpen(true);
                }}
              >
                <Entypo name={'clock'} size={28} color={COLORS.primary} />
              </TouchableOpacity>
            }
          />
          {/* </View> */}
          {/* <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting reference no."
            value={state.meeting_ref_no}
            onChange={r => onchangeState('meeting_ref_no', r)}
          /> */}
          {/* <View style={{marginHorizontal: 12}}>
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
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="Event Number"
                value={state.eventNumber}
                onChange={a => onchangeState('eventNumber', a)}
              />
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
          ) : null} */}
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={user}
            labelField="email"
            valueField="email"
            placeholder={`Select attendees *`}
            searchPlaceholder="Search..."
            value={state.attendees}
            onChange={item => {
              //   console.log('asasasas', item);
              onchangeState('attendees', item);
            }}
            onFocus={f => onErrorChange(f, 'attendees')}
          />
          {!inputRecode == state.attendees ? (
            <Text style={{color: COLORS.error, marginHorizontal: 10}}>
              please select any one option
            </Text>
          ) : null}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            // error={stateError.email}
            inputMode="email"
            placeholder="Add Invitational Email"
            keyboardType="email-address"
            value={state.inviteEmail}
            onChange={invitation => {
              onchangeState('inviteEmail', invitation);
            }}
            appendComponent={
              !state.inviteEmail ? (
                <TouchableOpacity
                  onPress={() =>
                    ToastAndroid.show(
                      'if you want to add new attendees, enter his email',
                      ToastAndroid.SHORT,
                    )
                  }
                >
                  <Entypo name="email" size={25} color={COLORS.primary} />
                </TouchableOpacity>
              ) : (
                <TextButton
                  label={'add email'}
                  contentContainerStyle={{
                    ...FONTS.base,
                    padding: 5,
                    borderRadius: SIZES.radius,
                  }}
                  onPress={() => {
                    AddEmailFunction();
                  }}
                />
              )
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Upload Document"
            value={selectImage?.[0]?.uri}
            onChange={d => onchangeState('documents', d)}
            appendComponent={
              <AntDesign
                name={'upload'}
                size={30}
                color={COLORS.primary}
                onPress={() => selectFile()}
              />
            }
          />
        </KeyboardAwareScrollView>
        <View>
          <FlatList
            data={selectImage}
            keyExtractor={(item, index) =>
              (item?.filename ?? item?.path) + index
            }
            renderItem={({item}) => {
              console.log('item', item.uri);
              return (
                <View style={{}}>
                  <Image
                    source={{uri: item.uri}}
                    style={{
                      width: 100,
                      height: 100,
                      flex: 1,
                      borderRadius: SIZES.radius,
                    }}
                  />
                  {/* <Text>{item.name}</Text> */}
                  <TouchableOpacity
                    //   onPress={() => onDelete(item)}
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
          {selectImage ? (
            <TextButton
              label={'upload Image'}
              contentContainerStyle={{
                backgroundColor: 'none',
                margin: 10,
              }}
              labelStyle={{
                color: COLORS.primary,
              }}
              onPress={() => uploadFile(selectImage)}
            />
          ) : null}
        </View>
        <TextButton
          label={editMeeting ? 'Edit' : 'Save'}
          contentContainerStyle={{
            height: 55,
            borderRadius: SIZES.radius,
            marginTop: 10,
          }}
          labelStyle={{
            color: COLORS.light,
            ...FONTS.h4,
          }}
          onPress={() => {
            // editMeeting ? updateMeeting() : submitHandle();
            // validate()  ? submitHandle() : updateMeeting();

            if (editMeeting) {
              updateMeeting();
              return;
            }
            if (validate()) {
              submitHandle();
              ToastAndroid.show('successfully submit form', ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('validation failed', ToastAndroid.SHORT);
            }
          }}
        />
      </View>
      {/* {open && ( */}
      <DatePicker
        modal
        open={open}
        date={date}
        mode={dPValues?.mode}
        onConfirm={date => {
          if (dPValues.key) {
            if (dPValues.mode === 'date') {
              onchangeState(dPValues.key, moment(date).format('L'));
            } else {
              onchangeState(dPValues.key, moment(date).format('LTS'));
            }
            setInputRecode({...inputRecode, [dPValues.key]: false});
          } else {
            console.log('KEY IS NOT FOUND !');
          }
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {/* )} */}
      {/* {openStart ? (
        <DatePicker
          modal
          open={openStart}
          date={date}
          mode={'time'}
          onConfirm={date => {
            setOpenStart(false);
            setDate(date);
            onchangeState('meeting_time_start', moment(date).format('LTS'));
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
            onchangeState('meeting_time_end', moment(date).format('LTS'));
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
      ) : null} */}
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
