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
import {Dropdown} from 'react-native-element-dropdown';

const AddMeeting = ({addNotesModal, setNotesModal, navigation}) => {
  const token = useSelector(state => state?.user?.user);

  const [isLoading, setIsLoading] = useState(false);
  const [listState, setListState] = useState([]);
  const [state, setState] = useState({
    meeting_id: forMeetingID,
    duration: '',
    notes: '',
    decision: '',
  });

  const submitHandle = async () => {
    setIsLoading(true);
    let url = constants.endPoint.note;
    let params = {
      meeting_id: '29',
      duration: '16',
      notes:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      decision:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    };

    // console.log('params', params);
    // return;
    const response = await ApiMethod.postData(url, params, token);
    console.log('response', response);
    // navigation.navigate('Notes');
    setIsLoading(false);
    console.log('submit');
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
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleMeetingList();
  }, []);

  //   console.log(
  //     'meeting_id',
  //     listState.map(item => console.log(item.attendees[0])),
  //   );

  const forMeetingID = listState.map(item => console.log(item.attendees[0]));

  if (isLoading) return <ActivityIndicator />;
  return (
    <>
      <Header textHeader={'Add Notes'} leftIcon={true} />
      <View
        style={{
          backgroundColor: COLORS.support3_08,
          flex: 1,
          padding: SIZES.padding,
          margin: 10,
          borderRadius: SIZES.radius,
        }}
      >
        {/* <Text style={{...FONTS.body2, fontSize: SIZES.h2}}>Basic Details</Text>
        <Text>Enter basic details of the meeting</Text> */}
        <KeyboardAwareScrollView>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={forMeetingID}
            search
            maxHeight={300}
            labelField="meeting_id"
            valueField="id"
            placeholder="Select meeting_id"
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
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Duration"
            value={state.duration}
            onChange={d => onchangeState('duration', d)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Notes"
            value={state.notes}
            onChange={n => onchangeState('notes', n)}
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Decision"
            value={state.decision}
            onChange={n => onchangeState('notes', n)}
          />
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
            onPress={() => submitHandle()}
          />
        </KeyboardAwareScrollView>
      </View>
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
