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
  PermissionsAndroid,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIORITY = [
  {id: '1', priority: 'Low'},
  {id: '2', priority: 'High'},
  {id: '3', priority: 'Medium'},
];

const STATUS = [
  {id: '1', status: 'In Progress'},
  {id: '2', status: 'Complete'},
  {id: '3', status: 'On Hold'},
  {id: '4', status: 'Not Started'},
  {id: '5', status: 'Cancelled'},
];

const AddActionItem = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const {navigation} = props;

  const editData = props.route.params;

  const [selectImage, setSelectImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [listState, setListState] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [state, setState] = useState({
    meeting_id: '',
    note_id: '',
    owner_id: '',
    date_opened: '',
    task: '',
    priority: '',
    due_date: '',
    complete_percentage: '',
    image: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
    comment: '',
    documents: [
      //   {
      //     file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
      //     file_extension: '',
      //     file_name: '',
      //     uploading_file_name: '',
      //   },
    ],
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

  const submitHandle = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: 'post',
        url: 'https://meeting-api.gofactz.com/api/action-item',
        headers: {
          authorization: 'Bearer ' + token,
        },
        data: {
          meeting_id: state.meeting_id.id,
          note_id: state.note_id,
          owner_id: state?.owner_id?.id,
          date_opened: state.date_opened,
          task: state.task,
          priority: String(state.priority?.priority).toLowerCase(),
          due_date: state.due_date,
          complete_percentage: state.complete_percentage,
          image: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
          comment: state.comment,
          // documents: [
          //   {
          //     file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
          //     file_extension: '',
          //     file_name: '',
          //     uploading_file_name: '',
          //   },
          // ],
        },
      });
      setIsLoading(false);
      Alert.alert('Record successfully created');
      navigation.navigate('ActionList');
      //   console.log('create api response ...', res);
    } catch (error) {
      Alert.alert(error);
      console.log('error', error);
    }
  };

  const handleUpdateData = async () => {
    let url = constants.endPoint.action + '/' + editData.id;
    let param = {};

    try {
      setIsLoading(true);
      const updateRes = await ApiMethod.putData(url, param, token);
      if (updateRes) {
        setIsLoading(false);
        navigation.navigate('ActionList');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const uploadFile = async () => {
    let url = constants.base_url + constants.endPoint.uploadFile;
    let formDataRes = new FormData();

    filePath.map((obj, index) => {
      if (!obj.size) obj['size'] = obj.fileSize ?? obj.size;
      if (!obj.name) {
        obj['name'] = obj.fileName
          ? obj.fileName
          : obj.name
          ? obj.name
          : obj.uri.substr(obj.uri.lastIndexOf('/'), obj.uri.length);
      }
      formDataRes.append('file[]', [obj]);
    });

    formDataRes.append('is_multiple', 1);

    console.log('formDataRes', JSON.stringify(formDataRes));

    // return;
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

  const ListUser = async () => {
    const url = constants.endPoint.userList;
    const params = {};

    try {
      const result = await ApiMethod.postData(url, params, token);
      //   console.log('userResult', result?.data?.data);
      setUser(result?.data?.data);
      return;
    } catch (error) {
      //   AsyncStorage.removeItem('@user');
      //   navigation.navigate('AuthMain');
      console.log('error', error);
    }
  };

  const handleMeetingList = async () => {
    const url = constants.endPoint.meetingList;
    const params = {};
    try {
      const result = await ApiMethod.postData(url, params, token);
      setListState(result?.data?.data);
      return;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const handleNoteList = async () => {
    const url = constants.endPoint.notes;
    const params = {};
    try {
      const result = await ApiMethod.postData(url, params, token);
      setNoteList(result?.data?.data);
      return;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0]);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      //   console.log('base64 -> ', Obj.base64);
      //   console.log('uri -> ', Obj.uri);
      //   console.log('width -> ', Obj.width);
      //   console.log('height -> ', Obj.height);
      //   console.log('fileSize -> ', Obj.fileSize);
      //   console.log('type -> ', Obj.type);
      //   console.log('fileName -> ', Obj.fileName);
      setFilePath(response.assets);
      uploadFile();
    });
  };

  const meeting = listState.map(e => ({e: e.id}));
  const notes = noteList.map(e => ({e: e.notes}));

  const handleActionSubmit = async () => {
    let url = constants.endPoint.action;
    let data = {
      meeting_id: state.meeting_id.id,
      note_id: state.note_id.id,
      owner_id: state?.owner_id?.id,
      date_opened: state.date_opened,
      task: state.task,
      priority: String(state.priority?.priority).toLowerCase(),
      due_date: state.due_date,
      complete_percentage: state.complete_percentage,
      //   image: formData.append(
      //     'image',
      //     filePath.map(e => ({
      //       uri: e.uri,
      //     })),
      //   ),
      image: '',
      comment: state.comment,
      documents: [
        // {
        //   file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
        //   file_extension: '',
        //   file_name: '',
        //   uploading_file_name: '',
        // },
      ],
    };

    console.log('firstData', data);
    try {
      await ApiMethod.postData(url, data, token);
      Alert.alert('Record successfully created.');
      navigation.navigate('ActionList');
    } catch (error) {
      console.log('error', error);
    }
  };

  //   console.log('meeting', meeting, '/n', 'notes', notes);

  useEffect(() => {
    ListUser();
    handleMeetingList();
    if (meeting == notes) {
      handleNoteList();
    }
  }, []);

  //   console.log('editDataAction', editData);
  useEffect(() => {
    if (editData) {
      setState({
        ...state,
        // meeting_id: editData.meeting_id,
        note_id: editData.note_id,
        owner_id: editData?.owner_id?.id,
        date_opened: editData.date_opened,
        task: 'editData.task',
        priority: String(editData.priority?.priority).toLowerCase(),
        due_date: editData.due_date,
        complete_percentage: editData.complete_percentage,
        image: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
        comment: editData.comment,
        // documents: [
        //   {
        //     file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
        //     file_extension: '',
        //     file_name: '',
        //     uploading_file_name: '',
        //   },
        // ],
      });
    }
  }, []);

  return (
    <>
      <Header
        textHeader={editData ? 'Edit Action Item' : 'Create Action Item'}
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
        <KeyboardAwareScrollView>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={listState}
            search
            maxHeight={300}
            labelField="meeting_title"
            valueField="id"
            placeholder="Select meeting id"
            searchPlaceholder="Search..."
            value={state.meeting_id}
            onChange={item => {
              onchangeState('meeting_id', item);
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
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={noteList}
            search
            maxHeight={300}
            labelField="notes"
            valueField="id"
            placeholder="Select Notes id"
            searchPlaceholder="Search..."
            value={state.meeting_id}
            onChange={item => {
              onchangeState('meeting_id', item);
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
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={user}
            search
            maxHeight={300}
            labelField="email"
            valueField="id"
            placeholder="Select Owner"
            searchPlaceholder="Search..."
            value={state.owner_id}
            onChange={item => {
              onchangeState('owner_id', item);
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
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={PRIORITY}
            search
            maxHeight={300}
            labelField="priority"
            valueField="id"
            placeholder="Select priority"
            searchPlaceholder="Search..."
            value={state.priority}
            onChange={item => {
              onchangeState('priority', item);
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                marginTop: 10,
                width: '48%',
              }}
              placeholder="Open Date"
              autoFocus={false}
              value={state.date_opened}
              onChange={d => {
                //   console.log('date', d);
                onchangeState('date_opened', d);
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
                marginTop: 10,
                width: '48%',
              }}
              placeholder="Due Date"
              value={state.due_date}
              onChange={t => {
                // console.log('due_date', t);
                onchangeState('due_date', t);
              }}
              appendComponent={
                <TouchableOpacity onPress={() => setOpenTime(true)}>
                  <Fontisto name={'date'} size={25} color={COLORS.primary} />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown
              style={[styles.dropdown, {width: '50%'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={STATUS}
              search
              maxHeight={300}
              labelField="status"
              valueField="id"
              placeholder="Select Status"
              searchPlaceholder="Search..."
              value={state.meeting_id}
              onChange={item => {
                onchangeState('status', item);
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
                marginTop: 10,
                width: '48%',
              }}
              placeholder="Complete (%)"
              value={state.complete_percentage}
              onChange={t => {
                onchangeState('complete_percentage', t);
              }}
              keyboardType="numeric"
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
            placeholder="Task"
            value={state.task}
            numberOfLines={10}
            onChange={o => onchangeState('task', o)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Comment"
            value={state.comment}
            numberOfLines={10}
            onChange={o => onchangeState('comment', o)}
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
                    <TouchableOpacity
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
            label={editData ? 'Edit' : 'Save'}
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
              if (editData) {
                handleUpdateData();
              } else {
                handleActionSubmit();
              }
            }}
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
            console.log('date', date);
            setOpen(false);
            setDate(date);
            onchangeState('date_opened', moment(date).format('YYYY-MM-DD'));
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
          mode={'date'}
          onConfirm={date => {
            setOpenTime(false);
            setDate(date);
            onchangeState('due_date', moment(date).format('YYYY-MM-DD'));
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
      ) : null}
    </>
  );
};

export default AddActionItem;

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
