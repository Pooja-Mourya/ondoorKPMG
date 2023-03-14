import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {COLORS, constants, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {fonts} from '@rneui/base';
import FormInput from '../../../components/FormInput';
import TextButton from '../../../components/TextButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AppSetting = () => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const [load, setLoad] = useState(false);
  const [getData, setGetData] = useState([]);
  const [old_password, setOld_password] = useState('');
  const [password, setPassword] = useState('');
  const [changePasswordModal, setChnagePasswordModal] = useState(false);
  //   const token =
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZWUxYzYxNzMzN2E5M2VhYmI4ZjQ1ZmQ0ZjAyMGI2NmEyZTA5NGJlNTVlZDZhYzdlYmY5MTUwZTg4MTYyMmZmN2M3ZjVlMGVlZGJiZDc1ZDMiLCJpYXQiOjE2NzgxNjg5ODQuOTgyNzA1MTE2MjcxOTcyNjU2MjUsIm5iZiI6MTY3ODE2ODk4NC45ODI3MDcwMjM2MjA2MDU0Njg3NSwiZXhwIjoxNzA5NzkxMzg0Ljk3ODk2MDAzNzIzMTQ0NTMxMjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.rk2qowsOed3rZAj5Yd0gnuWH0Lns8gdlAwNvEWtcvCYK6DZcJ0ZVzdgrbQ4BwhLItUzEG0Ao__z1sESsRowk8cOh84S9fI6e96pzl0g8LH8HyfsOK_r3X2IHjJ2nrovLuTchJJDDpdzrpI4rx1Z9JlSqOwF4bxYuJwdesf2UlU1M98GzK7peHkqDaegiTDdPmVhA5l6GnoPBL3k8s8AbrkAsJa5zVGyolP37SyU4GfzZDUdOLfgCmyvxVgoKgkwxSxGDC08ujwtdmKh6NlQbYoOvvIjFeHkUEfp50iM6YATm4YJ1HYqxVD4Lwpz0r5f2zrD7si1WeP9LPMH2yLDJ9IkfoXCmLlPnTGC5ljkFzlwBdU1g7AtZNHdKIedp57_EakyhxOjviMpEZg1LJbg8PEl5BeME-RHkNeGwGb3TCONykXx-U8Hl1CZxtIPZowKRLqFrWdub4tfmujjQD6Bc4VE6fVi1F-LT48y7dlXshVWHUm8c46J36U3bEz1cNi4x91IM9UlrETbd-xJPe0m8cXEa_W4TsXmYDa3-g3ORkgghwaTW-TY0g6fmzixGURy1VmNnGu7sbIZ4W6KpTS5qOlGExYBn9PV0cImmyCPhHFMo9RjwOHYcVOMw0BF3jAB5Az5t8Yr4w4JOe7-Hfs8mnAzcgszhYsmuAKhkw5nNYvg';

  //   const GetAppSettingData = async () => {
  //     const url = constants.endPoint.appSetting;
  //     const params = {};
  //     try {
  //       setLoad(true);
  //       const result = await ApiMethod.getData(url, params, token);
  //       setGetData(result);
  //       console.log('result************', result);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  const chnagePasswordHandler = async () => {
    const url = constants.endPoint.changePassword;
    const params = {
      //   old_password: '12345678',
      //   password: '12345678',
      old_password,
      password,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);

      console.log('chnagePassword', result);
      if (result) {
        setChnagePasswordModal(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const updatePasswordHandler = async () => {
    const url = constants.endPoint.updatePassword;
    const params = {
      //   old_password: '12345678',
      //   password: '12345678',
      password,
      token,
    };
    try {
      setLoad(true);
      const result = await ApiMethod.postData(url, params, token);

      console.log('updatePassword', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  //   useEffect(() => {
  //     GetAppSettingData();
  //   }, []);
  //   if (load === true) return <ActivityIndicator />;
  return (
    <>
      {/* <Text>AppSetting</Text>
      <Text>{getData.id}</Text> */}

      <TextButton
        label={'AppSetting'}
        contentContainerStyle={{
          height: 55,
          borderRadius: SIZES.radius,
          margin: 10,
        }}
        labelStyle={{
          color: COLORS.light,
          ...fonts.h4,
        }}
        //   onPress={() => {
        //     chnagePasswordHandler();
        //   }}
      />
      <TextButton
        label={'Change Password'}
        contentContainerStyle={{
          height: 55,
          borderRadius: SIZES.radius,
          margin: 10,
        }}
        labelStyle={{
          color: COLORS.light,
          ...fonts.h4,
        }}
        onPress={() => {
          setChnagePasswordModal(true);
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setChnagePasswordModal(!changePasswordModal);
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLORS.lightGrey80,
          }}
        >
          <View
            style={{
              width: '90%',
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => setChnagePasswordModal(false)}
            >
              <AntDesign
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  elevation: 2,
                  margin: 10,
                  padding: 5,
                }}
                name="close"
                size={25}
                color={COLORS.dark}
              />
            </TouchableOpacity>

            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                marginTop: 10,
              }}
              placeholder="old password"
              value={old_password}
              onChange={e => setOld_password(e)}
              prependComponent={
                <Fontisto name="eye" size={25} color={COLORS.grey} />
              }
            />
            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                marginTop: 10,
              }}
              placeholder="password"
              value={password}
              onChange={e => setPassword(e)}
              prependComponent={
                <Fontisto name="eye" size={25} color={COLORS.grey} />
              }
            />
            <TextButton
              label={'Submit'}
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                margin: 10,
              }}
              labelStyle={{
                color: COLORS.light,
                ...fonts.h4,
              }}
              onPress={() => {
                chnagePasswordHandler();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppSetting;

const styles = StyleSheet.create({});
