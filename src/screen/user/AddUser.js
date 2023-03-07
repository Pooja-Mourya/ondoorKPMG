import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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

const data = [
  {
    id: '1',
    role: 'admin',
  },

  {
    id: '2',
    role: 'user',
  },
];

const AddUser = props => {
  const {navigation} = props;

  const userEdit = props.route.params;

  const token = useSelector(state => state?.user?.user);

  //   console.log('userEdit', userEdit);

  const [click, setClick] = useState(false);
  const [load, setLoad] = useState(false);
  const [input, setInput] = useState({
    role_id: '',
    name: '',
    email: '',
    mobile_number: '',
    designation: '',
    password: '',
    confirm_password: '',
  });

  const handleOnChangeState = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandle = async () => {
    const url = constants.endPoint.user;
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
      const result = await ApiMethod.postData(url, params, token);
      if (result) {
        Alert.alert('user added successfully');
        navigation.navigate('User');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const EditUserHandler = async () => {
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
        Alert.alert('user added successfully');
        navigation.navigate('User');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (userEdit) {
      setInput({
        ...input,
        role_id: userEdit.role_id,
        name: userEdit.name,
        email: userEdit.email,
        mobile_number: userEdit.mobile_number,
        designation: userEdit.designation,
        password: userEdit.password,
        confirm_password: userEdit.confirm_password,
      });
    }
  }, []);
  if (load === true) return <ActivityIndicator />;
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
            labelField="role"
            valueField="id"
            placeholder="Select role"
            searchPlaceholder="Search..."
            value={input.role_id}
            onChange={item => {
              handleOnChangeState('role_id', item);
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
            }}
            placeholder="Name"
            value={input.name}
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
            placeholder="Email"
            value={input.email}
            onChange={e => handleOnChangeState('email', e)}
            prependComponent={
              <Fontisto name="email" size={25} color={COLORS.grey} />
            }
          />

          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="mobile number"
            value={input.mobile_number}
            onChange={u => handleOnChangeState('mobile_number', u)}
            prependComponent={
              <AntDesign name="phone" size={25} color={COLORS.grey} />
            }
          />
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.error,
              marginTop: 10,
            }}
            placeholder="Password"
            secureTextEntry={true}
            value={input.password}
            onChange={p => handleOnChangeState('password', p)}
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
            placeholder="Confirm Password"
            secureTextEntry={click}
            value={input.confirm_password}
            onChange={p => handleOnChangeState('confirm_password', p)}
            prependComponent={
              <AntDesign name="eyeo" size={25} color={COLORS.grey} />
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
            placeholder="Designation"
            value={input.designation}
            onChange={d => handleOnChangeState('designation', d)}
            prependComponent={
              <Feather name="shopping-bag" size={20} color={COLORS.grey} />
            }
          />
          {/* <CheckBox
            containerStyle={{backgroundColor: '', lineHeight: 20}}
            isSelected={termChecked}
            onPress={() => setTermChecked(!termChecked)}
          /> */}
          <TextButton
            label={userEdit ? ' Edit User' : 'Add User'}
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
              userEdit ? EditUserHandler() : submitHandle();
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
