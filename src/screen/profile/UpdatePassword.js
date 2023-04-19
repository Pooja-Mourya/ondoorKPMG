import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/layout/Header';
import TextButton from '../../components/TextButton';
import FormInput from '../../components/FormInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../../Services/APIService';
import {COLORS, FONTS, SIZES, constants} from '../../constants';

const UpdatePassword = props => {
  const {navigation, upPassModal, setUpPassModal} = props;

  const token = useSelector(state => state?.user?.user?.access_token);

  const [length, setLength] = useState(10);
  const [password, setPassword] = useState();
  const [click, setClick] = useState(false);
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState(false);
  const [input, setInput] = useState({
    old_password: '',
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

    if (!input.old_password) {
      handleError('please enter old_password', 'old_password');
      isValid = false;
    }
    // if (!input.password || !password) {
    //   handleError('please enter password', 'password');
    //   isValid = false;
    // }
    // if (
    //   (!input.confirm_password && input.password === input.confirm_password) ||
    //   !password
    // ) {
    //   handleError('please enter confirm_password', 'confirm_password');
    //   isValid = false;
    // }
    if (isValid) {
      return isValid;
    }
  };

  const generatePassword = () => {
    const formValid = +length > 0;
    const string = 'abcdefghijklmnopqrstuvwxyz';
    const numeric = '0123456789';
    const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (!formValid) {
      return;
    }
    let character = '';
    let password = '';
    while (password.length < length) {
      const entity1 = Math.ceil(string.length * Math.random() * Math.random());
      const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      const entity3 = Math.ceil(
        punctuation.length * Math.random() * Math.random(),
      );
      let hold = string.charAt(entity1);
      hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
      character += hold;
      character += numeric.charAt(entity2);
      character += punctuation.charAt(entity3);
      password = character;
    }
    password = password
      .split('')
      .sort(() => {
        return 0.5 - Math.random();
      })
      .join('');
    setPassword(password.substr(0, length));
  };

  const submitHandle = async () => {
    setLoad(true);
    const url = constants.endPoint.changePassword;
    const params = {
      old_password: input.old_password,
      password: input.password || password,
      confirm_password: input.confirm_password || password,
    };

    console.log('params', params);

    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);
      if (result) {
        ToastAndroid.show('user added successfully', ToastAndroid.SHORT);
        setUpPassModal(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoad(false);
      setUpPassModal(false);
    }
  };

  return (
    <>
      {/* <Header textHeader={'Change Password'} /> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}
      >
        <Text style={{fontSize: 20, fontWeight: '400'}}>Change Password</Text>
        <TouchableOpacity onPress={() => setUpPassModal(false)}>
          <AntDesign
            style={{backgroundColor: 'white', padding: 5, elevation: 1}}
            name="close"
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
        }}
        placeholder="Old Password *"
        value={input.old_password}
        error={errors.old_password}
        onFocus={e => {
          handleError(e, 'old_password');
        }}
        onChange={n => {
          handleOnChangeState('old_password', n);
          //   setLength(n);
        }}
        prependComponent={
          <AntDesign name="eye" size={25} color={COLORS.grey} />
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
        value={input.password || password}
        onChange={e => {
          handleOnChangeState('password', e);
          setPassword(e);
        }}
        error={errors.password}
        onFocus={e => {
          handleError(e, 'password');
          setPassword(e);
        }}
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
        value={input.confirm_password || password}
        onChange={p => {
          handleOnChangeState('confirm_password', p);
          setPassword(p);
        }}
        error={errors.confirm_password}
        onFocus={e => {
          handleError(e, 'confirm_password');
          setPassword(e);
        }}
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

      {/* <Text>{password}</Text> */}
      {password ? null : (
        <TextButton
          label={'Generate Password'}
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
            generatePassword();
          }}
        />
      )}
      <TextButton
        label={
          load ? (
            <ActivityIndicator color={COLORS.light} size="large" />
          ) : (
            'Change Password'
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
          //   submitHandle();
          if (validate()) {
            submitHandle();
          } else {
            ToastAndroid.show('validation failed', ToastAndroid.SHORT);
          }
        }}
      />
    </>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({});
