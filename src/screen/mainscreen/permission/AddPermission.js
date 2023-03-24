import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import FormInput from '../../../components/FormInput';
import {COLORS, constants, SIZES, FONTS} from '../../../constants';
import TextButton from '../../../components/TextButton';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/layout/Header';

const AddPermission = props => {
  const {navigation} = props;

  const editPre = props.route.params;

  console.log('permissionRoutesfsf', editPre);

  const token = useSelector(state => state?.user?.user?.access_token);

  const [state, setState] = useState({
    name: 'promotion-edit1',
    se_name: 'promotion-edit1',
    group_name: 'promotion',
    belongs_to: '3',
    entry_mode: '0',
  });

  const submitHandle = async () => {
    const url = constants.endPoint.permission;
    const params = {
      name: 'promotion-edit1',
      se_name: 'promotion-edit1',
      group_name: 'promotion',
      belongs_to: '3',
      entry_mode: '0',
    };

    try {
      const result = await ApiMethod.postData(url, params, token);
      //   return;
      if (result?.data?.data?.access_token) {
        navigation.navigate('PermissionList');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const updatePermission = async () => {
    let url = constants.endPoint.permission + '/' + editPre.id;
    let params = {
      name: 'promotion-edit1',
      se_name: 'promotion-edit1',
      group_name: 'promotion',
      belongs_to: '3',
      entry_mode: '0',
    };

    try {
      const updateRes = await ApiMethod.putData(url, params, token);
      if (updateRes) {
        navigation.navigate('Meeting');
      }
    } catch (error) {}
  };

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (editPre) {
      setState({
        ...state,
        meeting_title: editPre.meeting_title,
      });
    }
  }, []);
  return (
    <>
      <Header
        textHeader={'Add Permission'}
        onPressArrow={() => navigation.goBack()}
        leftIcon={true}
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
          <TextButton
            label={editPre ? 'Edit' : 'Save'}
            contentContainerStyle={{
              height: 55,
              borderRadius: SIZES.radius,
              marginTop: 15,
            }}
            labelStyle={{
              color: COLORS.light,
              ...FONTS.h4,
            }}
            onPress={() => (editPre ? updatePermission() : submitHandle())}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default AddPermission;

const styles = StyleSheet.create({});
