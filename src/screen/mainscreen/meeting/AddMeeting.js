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

const data = [
  {id: '1', duration: 'Every day'},
  {id: '2', duration: 'Every week'},
  {id: '3', duration: 'Every month'},
];

const AddMeeting = ({navigation}) => {
  const token = useSelector(state => state?.user?.user);

  const [enableCheck, setEnableCheck] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
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
    documents: selectImage,
    inviteEmail: '',
    is_multiple: 1,
  });
  const [stateError, setStateError] = useState('');

  const validate = () => {
    Keyboard.dismiss();
    if (state.email) {
      handleError('please input email');
    }
  };

  const handleError = (errorMessage, input) => {
    setStateError({...stateError, [errorMessage]: input});
  };

  const [emailValidError, setEmailValidError] = useState('');

  const handleValidEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (state.inviteEmail === 0) {
      setEmailValidError('email address must be enter');
    } else if (reg.test(state.inviteEmail) === false) {
      setEmailValidError('enter valid email address');
    } else if (reg.test(state.inviteEmail) === true) {
      setEmailValidError('');
    }
  };

  const AddEmailFunction = () => {
    const invitation = state.inviteEmail;
    onchangeState('attendees', [...state.attendees, invitation]);
    const u = user;

    u.push({
      id: invitation,
      email: invitation,
    });
    setUser([...u]);
    console.log('added');
  };

  const onDelete = val => {
    console.log('value', val);
    // const data = selectImage.filter(
    //   item => console.log('localIdentifier', item),
    //   item?.localIdentifier && item?.localIdentifier !== value?.localIdentifier,
    // );
    setSelectImage(data);
  };

  const submitHandle = async () => {
    const url = constants.endPoint.meeting;
    const params = {
      meeting_title: state.meeting_title,
      meeting_date: onlyDate,
      meeting_time: onlyTime,
      meeting_ref_no: state.meeting_ref_no,
      agenda_of_meeting: state.agenda_of_meeting,
      is_repeat: data.id,
      attendees: [user.email].concat(state.inviteEmail),
      documents: [selectImage.uri],
    };

    console.log('params', params);

    return;

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
      //   console.log('imageResponse', imageResponse);
      //   setUploadFiles(imageResponse);
    } catch (error) {
      console.log('error', error);
      console.log('imageResponse', imageResponse);
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
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

  if (isUploadLoading) return <ActivityIndicator />;
  return (
    <>
      <Header
        textHeader={'Create Meeting'}
        leftIcon={true}
        rightIcon={true}
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
                // console.log('25/02/2023', d);
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
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="Event Number"
                value={state.eventNumber}
                onChange={a => onchangeState('eventNumber', a)}
              />
              {/* {state.eventNumber === Number ? null : (
                  <Text
                    style={{
                      color: state.eventNumber === Number ? COLORS.error : 'grey',
                    }}
                  >
                    this field is required
                  </Text>
                )} */}
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
              //   console.log('asasasas', item);
              onchangeState('attendees', item);
            }}
          />
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
              // handleValidEmail(invitation);
            }}
            appendComponent={
              !state.inviteEmail ? (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'if you want to add new attendees, enter his email',
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
                    if (handleValidEmail()) {
                      AddEmailFunction();
                    } else {
                      Alert.alert('invalid email address');
                    }
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
            value={selectImage?.[0]?.name}
            onChange={d => onchangeState('documents', console.log('d', d))}
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
                    {/* {} */}
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
                    {/* <Text>{item.name}</Text> */}
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
                onPress={() => uploadFile()}
              />
            ) : null}
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
            onPress={() => {}}
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
