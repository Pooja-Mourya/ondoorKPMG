import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../../components/FormInput';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {constants} from '../../constants';
import ApiMethod from '../../Services/APIService';
import {ActivityIndicator} from 'react-native';
import TextButton from '../../components/TextButton';
import {useSelector} from 'react-redux';

const Forgot = ({navigation}) => {
  const token = useSelectorr(state => state?.user?.user?.access_token);

  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState('');

  const submitHandle = async () => {
    const url = constants.endPoint.forgetPassword;
    const params = {
      email: email,
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
  if (load === true) return <ActivityIndicator />;
  return (
    <View>
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="Email"
        value={input.email}
        onChange={e => setEmail(e)}
        prependComponent={
          <Fontisto name="email" size={25} color={COLORS.grey} />
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
          ...FONTS.h4,
        }}
        onPress={() => {
          submitHandle();
        }}
      />
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({});
