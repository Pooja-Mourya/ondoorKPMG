import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import TextButton from '../../components/TextButton';
import FormInput from '../../components/FormInput';
import ApiMethod from '../../Services/APIService';

const AddUser = props => {
  const {navigation, profileModal, setProfileModal} = props;

  const token = useSelector(state => state?.user?.user);

  const userEdit = token;

  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState(false);
  const [input, setInput] = useState({
    name: '',
    email: '',
    mobile_number: '',
    designation: '',
  });

  const handleError = (error, value) => {
    setErrors(errors => ({...errors, [value]: error}));
  };

  const handleOnChangeState = (name, value) => {
    setInput(input => ({
      ...input,
      [name]: value,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!input.name) {
      handleError('please enter name', 'name');
      isValid = false;
    }
    if (!input.email) {
      handleError('please enter email', 'email');
      isValid = false;
    }
    if (!input.mobile_number) {
      handleError('please enter number', 'mobile_number');
      isValid = false;
    }
    if (!input.designation) {
      handleError('please enter designation', 'designation');
      isValid = false;
    }
    if (isValid) {
      return isValid;
    }
  };

  const EditUserHandler = async () => {
    setLoad(true);
    const url = constants.endPoint.user + '/' + userEdit.id;
    const params = {
      name: input.name,
      email: input.email,
      mobile_number: input.mobile_number,
      designation: input.designation,
    };

    console.log('params', params);
    // return;
    try {
      setLoad(true);
      const result = await ApiMethod.putData(url, params, token.access_token);
      if (result) {
        ToastAndroid.show('user added successfully', ToastAndroid.SHORT);
        setProfileModal(false);
      } else {
        ToastAndroid.show('server error', ToastAndroid.SHORT);
        setProfileModal(false);
      }
      setLoad(false);
    } catch (error) {
      console.log('error', error);
      setLoad(false);
    }
  };

  useEffect(() => {
    if (userEdit) {
      setInput({
        ...input,
        name: userEdit.name,
        email: userEdit.email,
        mobile_number: '' + userEdit.mobile_number,
        designation: userEdit.designation,
      });
    }
  }, []);

  return (
    <>
      <KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <Text style={{fontSize: 20, fontWeight: '400'}}>Update Profile</Text>
          <TouchableOpacity onPress={() => setProfileModal(false)}>
            <AntDesign
              style={{backgroundColor: 'white', padding: 5, elevation: 1}}
              name="close"
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 10}}>
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: '400',
              fontSize: 16,
              paddingVertical: 5,
            }}
          >
            Personal Details
          </Text>
          <Text>Password will be sent to the given email addres</Text>
        </View>
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
          }}
          placeholder="Name *"
          value={input.name}
          error={errors.name}
          onFocus={e => {
            handleError(e, 'name');
          }}
          onChange={n => handleOnChangeState('name', n)}
          prependComponent={
            <AntDesign name="user" size={25} color={COLORS.grey} />
          }
        />

        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="mobile number *"
          value={input.mobile_number}
          maxLength={10}
          onChange={u => handleOnChangeState('mobile_number', u)}
          error={errors.mobile_number}
          onFocus={e => handleError(e, 'mobile_number')}
          prependComponent={
            <AntDesign
              style={{marginHorizontal: 5}}
              name="phone"
              size={22}
              color={COLORS.grey}
            />
          }
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="Designation *"
          value={input.designation}
          onChange={d => handleOnChangeState('designation', d)}
          error={errors.designation}
          onFocus={e => {
            handleError(e, 'designation');
          }}
          prependComponent={
            <Feather
              style={{marginHorizontal: 5}}
              name="shopping-bag"
              size={20}
              color={COLORS.grey}
            />
          }
        />
        <View style={{padding: 10}}>
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: '400',
              fontSize: 16,
              paddingVertical: 5,
            }}
          >
            Login Details
          </Text>
          <Text>
            Please enter the personal details of user. (*) marked fields are
            required.
          </Text>
        </View>
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="Email *"
          value={input.email}
          onChange={e => handleOnChangeState('email', e)}
          error={errors.email}
          onFocus={e => {
            handleError(e, 'email');
          }}
          prependComponent={
            <Fontisto
              style={{marginHorizontal: 5}}
              name="email"
              size={22}
              color={COLORS.grey}
            />
          }
        />
        {/* userEdit ? ' Edit User' : 'Add User' */}
        <TextButton
          label={
            load ? (
              <ActivityIndicator color={COLORS.light} size="large" />
            ) : userEdit ? (
              ' Edit User'
            ) : (
              'Add User'
            )
          }
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
            if (validate()) {
              EditUserHandler();
            } else {
              ToastAndroid.show('validation failed', ToastAndroid.SHORT);
            }
          }}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  authContainer: {
    // flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 2,
    paddingHorizontal: 10,
    // justifyContent: 'center',
  },
});
