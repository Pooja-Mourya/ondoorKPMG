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
  ToastAndroid,
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
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import DocumentPicker, {types} from 'react-native-document-picker';

const AddMeeting = props => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const {
    navigation,
    addNotesModal,
    setAddNotesModal,
    setEditable,
    editable,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [listState, setListState] = useState([]);
  const [state, setState] = useState({
    meeting_id: '',
    duration: '',
    notes: '',
    decision: '',
  });
  const [selectImage, setSelectImage] = useState([]);
  const [errors, setErrors] = useState(false);

  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    if (!state.meeting_id.id) {
      handleError('this field is required', 'meeting_id');
      valid = false;
    }
    if (!state.notes) {
      handleError('this field is required', 'notes');
      valid = false;
    }
    if (valid) {
      return valid;
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors({...errors, [input]: errorMessage});
  };

  const handleImagePiker = async () => {
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

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append('file[0]', selectImage?.[0]);
    formData.append('is_multiple', '1');

    console.log('formData', JSON.stringify(formData));

    // return;
    try {
      const res = await axios.post(
        'https://meeting-api.gofactz.com/api/file-upload',
        formData,
        {
          headers: {
            accept: '*/*',
            'content-type': 'multipart/form-data',
            authorization: 'Bearer ' + token,
          },
        },
      );
      console.log('imageRes', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const submitHandle = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: 'https://meeting-api.gofactz.com/api/note',
      headers: {
        authorization: 'Bearer ' + token,
      },
      data: {
        meeting_id: state.meeting_id.id,
        duration: state.duration,
        notes: state.notes,
        decision: state.decision,
        documents: [
          //   {
          //     file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
          //     file_extension: '',
          //     file_name: '',
          //     uploading_file_name: '',
          //   },
        ],
      },
    });
    ToastAndroid.show('Record successfully created', ToastAndroid.SHORT);
    // console.log('create api response ...', res);
    setIsLoading(false);
    setAddNotesModal(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    let url = constants.endPoint.note + '/' + editable.id;
    let params = {
      meeting_id: state.meeting_id.id,
      duration: state.duration,
      notes: state.notes,
      decision: state.decision,
      documents: [
        {
          file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
          file_extension: '',
          file_name: '',
          uploading_file_name: '',
        },
      ],
    };

    try {
      const response = await ApiMethod.putData(url, params, token);
      ToastAndroid.show(' note update successfully', ToastAndroid.SHORT);
      setIsLoading(false);
      console.log('response', response);
      setAddNotesModal(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
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

  useEffect(() => {
    handleMeetingList();
  }, []);

  useEffect(() => {
    if (editable) {
      setState({
        ...state,
        meeting_id: editable.meeting_id,
        duration: editable.duration,
        notes: editable.notes,
        decision: editable.decision,
        documents: editable.documents,
      });
    }
  }, []);

  //   if (isLoading) return <ActivityIndicator />
  return (
    <>
      <Header
        textHeader={!editable ? 'Add Notes' : 'Edit Notes'}
        // leftIcon={true}
        // onPressArrow={() => !false)}
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
        <TouchableOpacity
          onPress={() => {
            if (editable) {
              setEditable(false);
            } else {
              setAddNotesModal(false);
            }
          }}
          style={{alignItems: 'flex-end'}}
        >
          <AntDesign
            style={{
              backgroundColor: COLORS.light,
              borderRadius: 50,
              padding: 5,
              elevation: 1,
            }}
            name="close"
            size={25}
            color={COLORS.dark}
          />
        </TouchableOpacity>
        <Text style={{...FONTS.body2, fontSize: SIZES.h2}}>Basic Details</Text>
        <Text>Enter basic details of the notes</Text>
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
            labelField={'meeting_title'}
            valueField="meeting_id"
            placeholder="Select meeting id"
            searchPlaceholder="Search..."
            value={state.meeting_id}
            onChange={item => {
              onchangeState('meeting_id', item);
            }}
            onFocus={m => handleError(m, 'meeting_id')}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />
          {!errors == state.meeting_id ? (
            <Text style={{color: COLORS.error, marginHorizontal: 10}}>
              please set meeting id
            </Text>
          ) : null}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Notes *"
            value={state.notes}
            error={errors.notes}
            onChange={n => onchangeState('notes', n)}
            onFocus={m => handleError(m, 'notes')}
            multiline={true}
            numberOfLines={4}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Duration"
            value={state.duration}
            onChange={d => onchangeState('duration', d)}
            keyboardType="numeric"
          />

          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Decision"
            value={state.decision}
            onChange={n => onchangeState('decision', n)}
            multiline={true}
            numberOfLines={4}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Documents"
            value={state.documents}
            onChange={n => onchangeState('documents', n)}
            appendComponent={
              <TouchableOpacity onPress={() => handleImagePiker()}>
                <AntDesign name="upload" size={25} color={COLORS.primary} />
              </TouchableOpacity>
            }
          />
          {/* <Text>{editable.documents[0].document}</Text>
          {editable ? <Text>{editable.duration}</Text> : null} */}

          {selectImage.length > 0 ? (
            <TextButton
              label={'Upload Image'}
              onPress={() => handleUploadImage()}
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                marginVertical: 15,
                width: '100%',
              }}
              labelStyle={{
                color: COLORS.light,
                ...FONTS.h4,
              }}
            />
          ) : null}
        </KeyboardAwareScrollView>
        <View>
          <FlatList
            data={selectImage}
            keyExtractor={(item, index) =>
              (item?.filename ?? item?.path) + index
            }
            renderItem={({item}) => {
              // console.log('item', item);
              return (
                <View style={{flexDirection: 'column', width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}
                  >
                    <View>
                      <Text>{item.name}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setSelectImage(selectImage.splice(0, 1))}
                    >
                      <AntDesign name="delete" size={20} color={'red'} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            numColumns={3}
          />
        </View>
      </View>
      {/* editable ? 'Update' : 'Save' */}
      <TextButton
        label={
          isLoading ? (
            <ActivityIndicator size={'large'} color={COLORS.light} />
          ) : editable ? (
            'Update'
          ) : (
            'Save'
          )
        }
        contentContainerStyle={{
          height: 55,
          borderRadius: SIZES.radius,
          marginVertical: 15,
          width: '100%',
        }}
        labelStyle={{
          color: COLORS.light,
          ...FONTS.h4,
        }}
        onPress={() => {
          if (editable) {
            handleUpdate();
            return;
          }
          if (validate()) {
            submitHandle();
            // Alert.alert('note submited successfully');
          } else {
            ToastAndroid.show('validation failed', ToastAndroid.SHORT);
          }
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
