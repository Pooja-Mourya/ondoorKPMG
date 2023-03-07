import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/layout/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../../constants';
import TextButton from '../../../components/TextButton';
import FormInput from '../../../components/FormInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ActionFilter = ({
  navigation,
  filterModal,
  setFilterModal,
  filterData,
}) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    designation: '',
    number: '',
    status: 'active',
  });
  const onChangeTextHandle = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmitFilterHandler = () => {
    console.log('pressed');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            backgroundColor: COLORS.light20,
            borderRadius: 50,
            padding: 5,
            elevation: 1,
          }}
          onPress={() => setFilterModal(false)}
        >
          <Text>
            <AntDesign name="close" size={30} color={COLORS.dark} />
          </Text>
        </TouchableOpacity>

        <Text style={{fontSize: SIZES.h2, padding: 10}}>Filter Action</Text>
      </View>
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
        }}
        placeholder="ENTER YOUR NAME"
        value={state.name}
        onChange={N => onChangeTextHandle('name', N)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="ENTER YOUR EMAIL"
        value={state.email}
        onChange={E => onChangeTextHandle('email', E)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="ENTER YOUR DESIGNATION"
        value={state.designation}
        onChange={D => onChangeTextHandle('designation', D)}
      />
      <FormInput
        containerStyle={{
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.error,
          marginTop: 10,
        }}
        placeholder="ENTER YOUR MOBILE NUMBER"
        value={state.number}
        onChange={M => onChangeTextHandle('number', M)}
      />
      <View style={{marginTop: 10}}>
        <BouncyCheckbox
          size={25}
          fillColor={COLORS.dark}
          unfillColor="#FFFFFF"
          text={state.status ? 'Active' : 'Inactive'}
          iconStyle={{borderColor: COLORS.support1}}
          innerIconStyle={{borderWidth: 2}}
          textStyle={{fontFamily: 'JosefinSans-Regular'}}
          onPress={s => onChangeTextHandle('status', s)}
        />
      </View>

      <TextButton
        label={'Filter Action'}
        contentContainerStyle={{
          height: 55,
          borderRadius: SIZES.radius,
          marginVertical: 10,
        }}
        labelStyle={{
          color: COLORS.light,
          ...FONTS.h4,
        }}
        onPress={() => onSubmitFilterHandler()}
      />
    </View>
  );
};

export default ActionFilter;

const styles = StyleSheet.create({});
