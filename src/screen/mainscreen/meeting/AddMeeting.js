import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/layout/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../../components/FormInput';
import {SIZES, COLORS, FONTS, constants} from '../../../constants';
import TextButton from '../../../components/TextButton';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddMeeting = () => {
  const token = useSelector(state => state?.user?.user);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [images, setImages] = useState([]);
  const [state, setState] = useState({
    meeting_title: '',
    metting_date: '',
    metting_time: '',
    meeting_ref_no: '',
    agenda_of_meeting: '',
    is_repeat: '',
    attendees: '',
    documents: '',
  });

  const submitHandle = async () => {
    const url = constants.endPoint.addMeeting;
    const params = {
      meeting_title: 'no subject',
      metting_date: '21/02/2023',
      metting_time: '05:28',
      meeting_ref_no: '0000',
      agenda_of_meeting: 'null',
      is_repeat: 'fdfd',
      attendees: 'ff',
      documents: 'gg',
    };

    try {
      const result = await ApiMethod.postData(url, params, token);
      //   console.log('result', result?.data?.data?.access_token);

      //   return;

      if (result?.data?.data?.access_token) {
        navigation.navigate('Meeting');
      }
      //   AsyncStorage.setItem('@user', JSON.stringify(result?.data?.payload));
    } catch (error) {
      console.log('error', error);
    }
  };

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: true,
        maxVideo: 1,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
        mediaType: 'All',
        usedCameraButton: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = value => {
    const data = images.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };

  const renderItem = ({item, index}) => {
    console.log('path', item.path);
    return (
      <View style={{}}>
        <Image
          width={250}
          source={{
            uri: item?.path,
          }}
          style={{width: 100, height: 100, backgroundColor: 'red', flex: 1}}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={{}}
        >
          <Text style={{}}>
            <AntDesign name="delete" color={'red'} size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  function documentsFunction() {
    return (
      <>
        <Button title="Select Image" onPress={() => openPicker()} />
        <FlatList
          data={images}
          keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
          renderItem={renderItem}
          numColumns={3}
          style={{
            height: 220,
            borderWidth: 1,
            backgroundColor: COLORS.light,
          }}
        />
      </>
    );
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  console.log('state', state);
  return (
    <>
      <Header textHeader={'Add Meeting'} leftIcon={true} rightIcon={true} />
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
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Title"
            value={state.meeting_title}
            onChange={m => onchangeState('meeting_title', m)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/video-camera.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Date"
            value={state.metting_date}
            onChange={d => onchangeState('metting_date', d)}
            prependComponent={
              <TouchableOpacity onPress={showDatePicker}>
                <Image
                  source={require('../../../assets/icons/email.png')}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: SIZES.base,
                  }}
                />
              </TouchableOpacity>
            }
            appendComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting Time"
            value={state.metting_time}
            onChange={d => onchangeState('metting_time', d)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
            appendComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Meeting reference no."
            value={state.meeting_ref_no}
            onChange={r => onchangeState('meeting_ref_no', r)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Agenda of meeting"
            value={state.agenda_of_meeting}
            onChange={o => onchangeState('agenda_of_meeting', o)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Is repeat"
            value={state.is_repeat}
            onChange={a => onchangeState('is_repeat', a)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Attendees"
            value={state.attendees}
            onChange={m => onchangeState('attendees', m)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Document"
            value={state.documents}
            onChange={s => onchangeState('documents', s)}
            prependComponent={
              <Image
                source={require('../../../assets/icons/email.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                }}
              />
            }
          />
          <TextButton
            label={'Add Meeting'}
            contentContainerStyle={{
              height: 55,
              borderRadius: SIZES.radius,
              margin: 10,
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h4,
            }}
            onPress={() => submitHandle()}
          />
        </KeyboardAwareScrollView>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default AddMeeting;

const styles = StyleSheet.create({});
