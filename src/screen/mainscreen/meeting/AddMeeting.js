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
    title: '',
    agenda: '',
    link: '',
    date: '',
    time_start: '',
    time_end: '',
    attendees: '',
    invitation: '',
    photo: '',
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
    const url = 'http://10.0.2.2:5000/api/meeting/createMeeting';
    const params = {
      title: 'native title',
      agenda: 'native agenda',
      link: 'native link',
      date: 'native date',
      time_start: 'native time_start',
      time_end: 'native time_end',
      attendees: 'native attendees',
      invitation: 'native invitation',
      photo: 'native path',
    };

    console.log('params', params);
    console.log('url', url);
    const result = await ApiMethod.postData(url, params, null);
    Alert.alert('ok');
    console.log('result', result);
    //   return;
    //   if (result?.data?.data?.access_token) {
    //     navigation.navigate('Meeting');
    //   }
    navigation.navigate('Meeting');
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
    if (!state.title) {
      onErrorChange('this field is required ', 'title');
      isValid = false;
    }
    if (!state.agenda) {
      onErrorChange('this field is required ', 'agenda');
      isValid = false;
    }
    if (!state.date) {
      onErrorChange('this field is required', 'date');
      isValid = false;
    }
    if (!state.time_start) {
      onErrorChange('this field is required', 'time_start');
      isValid = false;
    }
    if (!state.time_end) {
      onErrorChange('this field is required', 'time_end');
      isValid = false;
    }
    if (!state.attendees) {
      onErrorChange('this field is required', 'attendees');
      isValid = false;
    }
    if (!state.invitation) {
      onErrorChange('this field is required', 'invitation');
      isValid = false;
    }
    if (!state.photo) {
      onErrorChange('this field is required', 'photo');
      isValid = false;
    }
    if (isValid) {
      return isValid;
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        // type: [types.doc, types.docx],
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

  //   useEffect(() => {
  //     if (editMeeting) {
  //       setState({
  //         ...state,
  //         title: editMeeting.title,
  //         meeting_date: editMeeting.meeting_date,
  //         meeting_time_end: editMeeting.meeting_time_end,
  //         time_start: editMeeting.time_start,
  //         meeting_ref_no: editMeeting.meeting_ref_no,
  //         agenda_of_meeting: editMeeting.agenda_of_meeting,
  //         is_repeat: editMeeting.is_repeat,
  //         // attendees: editMeeting.attendees[0].email,
  //         attendees: editMeeting.attendees?.map(e => ({
  //           email: e,
  //         })),
  //         documents: [
  //           //   {
  //           //     file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
  //           //     file_extension: '',
  //           //     file_name: '',
  //           //     uploading_file_name: '',
  //           //   },
  //         ],
  //       });
  //     }
  //   }, []);

  if (isUploadLoading) return <ActivityIndicator />;
  return (
    <>
      <Header
        textHeader={editMeeting ? 'Edit Meeting' : 'Create Meeting'}
        leftIcon={true}
        onPressArrow={() => navigation.navigate('Meeting')}
      />
      <Button title="submit button" onPress={() => submitHandle()} />
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
            value={state.title}
            error={inputRecode.title}
            onChange={m => onchangeState('title', m)}
            onFocus={m => onErrorChange(m, 'title')}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Agenda of meeting"
            value={state.agenda}
            numberOfLines={10}
            onChange={o => onchangeState('agenda', o)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Link"
            value={state.link}
            onChange={r => onchangeState('link', r)}
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
            value={state.date}
            error={inputRecode.date}
            onChange={d => {
              onchangeState('date', d);
            }}
            onFocus={f => onErrorChange(f, 'date')}
            editable={false}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setDPValues({mode: 'date', key: 'date'});
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
            value={state.time_start}
            onChange={d => {
              onchangeState('time_start', d);
            }}
            onFocus={f => onErrorChange(f, 'time_start')}
            error={inputRecode.time_start}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setDPValues({mode: 'time', key: 'time_start'});
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
            value={state.time_end}
            onChange={d => {
              onchangeState('time_end', d);
            }}
            error={inputRecode.time_end}
            onFocus={f => onErrorChange(f, 'time_end')}
            appendComponent={
              <TouchableOpacity
                onPress={() => {
                  setDPValues({mode: 'time', key: 'time_end'});
                  setOpen(true);
                }}
              >
                <Entypo name={'clock'} size={28} color={COLORS.primary} />
              </TouchableOpacity>
            }
          />
          {/* <MultiSelect
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
          /> */}

          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            // error={stateError.email}
            inputMode="email"
            placeholder="Add attendees Email"
            keyboardType="email-address"
            value={state.attendees}
            onChange={invitation => {
              onchangeState('attendees', invitation);
            }}
          />
          {/* {!inputRecode == state.attendees ? (
            <Text style={{color: COLORS.error, marginHorizontal: 10}}>
              please select any one option
            </Text>
          ) : null} */}
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
            value={state.invitation}
            onChange={invitation => {
              onchangeState('invitation', invitation);
            }}
            appendComponent={
              !state.invitation ? (
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
                    // AddEmailFunction();
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
            onChange={d => onchangeState('photo', d)}
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
          {/* {selectImage ? (
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
          ) : null} */}
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
