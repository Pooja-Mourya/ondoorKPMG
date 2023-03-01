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
import {Dropdown} from 'react-native-element-dropdown';

const AddMeeting = props => {
  const token = useSelector(state => state?.user?.user);

  const {navigation} = props;

  //   const routeData = props?.route.params?.action_items;

  //   console.log('routeData', routeData);

  const [isLoading, setIsLoading] = useState(false);
  const [listState, setListState] = useState([]);
  const [state, setState] = useState({
    meeting_id: '',
    duration: '',
    notes: '',
    decision: '',
  });
  const [errors, setErrors] = useState('');
  const [editData, setEditData] = useState({});

  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    if (state.notes) {
      handleError('this field is required');
      valid = false;
    }
    // else if(state.email.match('this string')){
    //     handleError('invalid email formate')
    // }
    if (valid) {
      AddMeeting();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors({...errors, [errorMessage]: input});
  };

  const submitHandle = async () => {
    setIsLoading(true);
    let url = constants.endPoint.note;
    let params = {
      meeting_id: listState.meeting_title,
      duration: state.duration,
      notes: state.notes,
      decision: state.decision,
    };

    // console.log('params', params);
    // return;

    try {
      const response = await ApiMethod.postData(url, params, token);

      //   navigation.navigate('Notes');
      Alert.alert(' note register successfully');
      setIsLoading(false);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  const EditHandle = async () => {
    setIsLoading(true);
    let url = constants.endPoint.note + '/' + id;
    let params = {
      meeting_id: listState.meeting_title,
      duration: state.duration,
      notes: state.notes,
      decision: state.decision,
    };

    try {
      const response = await ApiMethod.postData(url, params, token);

      //   navigation.navigate('Notes');
      Alert.alert(' note register successfully');
      setIsLoading(false);
      console.log('response', response);
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

  //   useEffect(() => {
  //     if (routeData) {
  //       setState({
  //         ...state,
  //         // [state.meeting_id]: routeData.meeting_id,
  //         [state.duration]: routeData.duration,
  //         [state.notes]: routeData.notes,
  //         [state.decision]: routeData.decision,
  //       });
  //     } else {
  //       setState({
  //         ...state,
  //         [state.meeting_id]: token.meeting_id,
  //         [state.duration]: token.duration,
  //         [state.notes]: token.notes,
  //         [state.decision]: token.decision,
  //       });
  //     }
  //   }, []);

  useEffect(() => {
    handleMeetingList();
  }, []);

  console.log('state', state);

  //   const forMeetingID = listState.map(item => item.attendees[0].meeting_id);
  //   const forMeetingID = listState.map(item => console.log('item', item));

  //   console.log('forMeetingID0', ...forMeetingID);
  //   console.log('routeData', routeData);

  if (isLoading) return <ActivityIndicator />;
  return (
    <>
      <Header
        textHeader={editData ? 'Edit Notes' : 'Add Notes'}
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
        {/* <Text style={{...FONTS.body2, fontSize: SIZES.h2}}>Basic Details</Text>
        <Text>Enter basic details of the meeting</Text> */}
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
          {/* <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="meeting_id"
            value={state.meeting_id}
            onChange={d => onchangeState('meeting_id', d)}
            error={errors.duration}
            onFocus={() => handleError(null, 'duration')}
            keyboardType="numeric"
          /> */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Duration"
            value={state.duration}
            onChange={d => onchangeState('duration', d)}
            error={errors.duration}
            onFocus={() => handleError(null, 'duration')}
            keyboardType="numeric"
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
            multiline={true}
            numberOfLines={4}
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
          <TextButton
            label={editData ? 'Edit' : 'Save'}
            contentContainerStyle={{
              height: 55,
              borderRadius: SIZES.radius,
              margin: 10,
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h4,
            }}
            onPress={() => {
              submitHandle();
              //   if (validate()) {
              //     submitHandle();
              //   } else {
              //     Alert.alert('invalid input');
              //   }
            }}
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
