import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/layout/Header';
import TextButton from '../../components/TextButton';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/FormInput';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import ApiMethod from '../../Services/APIService';
import {useSelector} from 'react-redux';
import {Keyboard} from 'react-native';

// const data = [
//   {
//     id: '1',
//     role: 'admin',
//   },

//   {
//     id: '2',
//     role: 'user',
//   },
// ];

const AddUser = props => {
  const {navigation} = props;

  const userEdit = props.route.params;

  const token = useSelector(state => state?.user?.user?.access_token);

  const [click, setClick] = useState(false);
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    role_id: '',
    name: '',
    email: '',
    mobile_number: '',
    designation: '',
    password: '',
    confirm_password: '',
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

    if (!input.role_id.id) {
      handleError('please select role id', 'role_id');
      isValid = false;
    }
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
    if (!input.password) {
      handleError('please enter password', 'password');
      isValid = false;
    }
    if (!input.confirm_password && input.password === input.confirm_password) {
      handleError('please enter confirm_password', 'confirm_password');
      isValid = false;
    }
    if (isValid) {
      return isValid;
    }
  };

  const submitHandle = async () => {
    setLoad(true);
    const url = constants.endPoint.user;
    const params = {
      role_id: input.role_id.id,
      name: input.name,
      email: input.email,
      mobile_number: input.mobile_number,
      designation: input.designation,
      password: input.password,
      confirm_password: input.confirm_password,
    };

    // console.log('params', params);

    // return;
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);
      if (result) {
        ToastAndroid.show('user added successfully', ToastAndroid.SHORT);
        navigation.navigate('User');
      }
    } catch (error) {
      console.log('error', error);
      setLoad(false);
    }
  };

  const EditUserHandler = async () => {
    setLoad(true);
    const url = constants.endPoint.user + '/' + userEdit.id;
    const params = {
      role_id: data.id,
      name: input.name,
      email: input.email,
      mobile_number: input.mobile_number,
      designation: input.designation,
      password: input.password,
      confirm_password: input.confirm_password,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.putData(url, params, token);
      if (result) {
        ToastAndroid.show('user added successfully', ToastAndroid.SHORT);
        navigation.navigate('User');
      }
      setLoad(false);
    } catch (error) {
      console.log('error', error);
      setLoad(false);
    }
  };

  const handleRoles = async () => {
    const url = constants.endPoint.roles;
    const params = {};
    setLoad(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data, 'url', url);
      setData(result?.data?.data);
      setLoad(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('data', data);
  useEffect(() => {
    handleRoles();
    if (userEdit) {
      setInput({
        ...input,
        role_id: userEdit.role_id,
        name: userEdit.name,
        email: userEdit.email,
        mobile_number: '' + userEdit.mobile_number,
        designation: userEdit.designation,
        password: '' + userEdit.password,
        confirm_password: '' + userEdit.confirm_password,
      });
    }
  }, []);
  //   if (load)
  //     return (
  //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //         <ActivityIndicator />
  //       </View>
  //     );
  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.authContainer}>
          <Text
            style={{
              width: '60%',
              lineHeight: 45,
              color: COLORS.dark,
              ...FONTS.dark,
              fontSize: SIZES.h1,
              paddingHorizontal: 10,
            }}
          >
            {userEdit ? 'Edit' : 'Add'} User by Admin
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder="Select role *"
            searchPlaceholder="Search..."
            value={input.role_id}
            onChange={item => {
              handleOnChangeState('role_id', item);
            }}
            onFocus={e => handleError(e, 'role_id')}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="grey"
                name="Safety"
                size={20}
              />
            )}
          />
          {!errors == input.role_id ? (
            <Text style={{color: COLORS.error, marginHorizontal: 10}}>
              please select any one option
            </Text>
          ) : null}
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
            placeholder="Password *"
            secureTextEntry={click}
            value={input.password}
            onChange={p => handleOnChangeState('password', p)}
            error={errors.password}
            onFocus={e => handleError(e, 'password')}
            prependComponent={
              <AntDesign
                style={{marginHorizontal: 5}}
                name="eyeo"
                size={25}
                color={COLORS.grey}
              />
            }
            appendComponent={
              <TouchableOpacity onPress={() => setClick(!click)}>
                <AntDesign
                  name={click == true ? 'eye' : 'eyeo'}
                  size={25}
                  color={COLORS.grey}
                />
              </TouchableOpacity>
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Confirm Password *"
            secureTextEntry={click}
            value={input.confirm_password}
            onChange={p => handleOnChangeState('confirm_password', p)}
            error={errors.confirm_password}
            onFocus={e => handleError(e, 'confirm_password')}
            prependComponent={
              <AntDesign
                style={{marginHorizontal: 5}}
                name="eyeo"
                size={25}
                color={COLORS.grey}
              />
            }
            appendComponent={
              <TouchableOpacity onPress={() => setClick(!click)}>
                <AntDesign
                  name={click == true ? 'eye' : 'eyeo'}
                  size={25}
                  color={COLORS.grey}
                />
              </TouchableOpacity>
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
              margin: 10,
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h4,
            }}
            onPress={() => {
              validate()
                ? submitHandle()
                : ToastAndroid.show('validation failed', ToastAndroid.SHORT);
              if (userEdit) {
                EditUserHandler();
                return;
              }
              if (validate()) {
                submitHandle();
              } else {
                ToastAndroid.show('validation failed', ToastAndroid.SHORT);
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddUser;

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
  authContainer: {
    flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 2,
    paddingHorizontal: 10,
  },
});
