import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import TextButton from '../../../components/TextButton';
import {Button} from 'react-native';
import CheckBox from '../../../components/CheckBox';

const AddRole = props => {
  const {navigation} = props;

  const editRole = props.route.params;

  const token = useSelector(state => state?.user?.user?.access_token);

  const [selected, setSelected] = useState([]);
  const [se_name, setSe_name] = useState([]);
  const [listState, setListState] = useState();
  const [checkUser, setCheckUser] = useState([]);
  const handleRoles = async () => {
    const url = constants.endPoint.permissions;
    const params = {};
    try {
      const result = await ApiMethod.postData(url, params, token);
      let obj = {};
      result?.data?.data.map(item => {
        if (obj[item.group_name]) {
          obj[item.group_name].push(item);
        } else {
          obj[item.group_name] = [item];
        }
      });
      setListState(obj.user);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  const SubmitRole = async () => {
    let url = constants.endPoint.role;
    let params = {
      se_name: se_name.name,
      permissions: [selected],
    };

    try {
      const preResult = await ApiMethod.postData(url, params, token);
      if (preResult) {
        navigation.navigate('Roles');
        Alert.alert('permission recorded successfully');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const EditRole = async () => {
    let url = constants.endPoint.role + '/' + editRole.id;
    let params = {
      se_name: se_name.name,
      permissions: [selected],
    };

    try {
      const preResult = await ApiMethod.putData(url, params, token);
      if (preResult) {
        navigation.navigate('Roles');
        Alert.alert('permission updated successfully');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCheck = selectCheck => {
    console.log('selectCheck', selectCheck);
    if (checkUser.includes(selectCheck)) {
      setCheckUser(checkUser.filter(checkValue => checkValue !== selectCheck));
      return;
    }
    setCheckUser(d => d.concat(selectCheck));
  };

  useEffect(() => {
    handleRoles();
  }, []);
  useEffect(() => {
    if (editRole) {
      setSelected(editRole.selected);
      setSe_name(editRole.se_name);
    }
  }, []);
  return (
    <>
      <Header textHeader={editRole ? 'EDIT ROLE' : 'ADD ROLE'} />
      <ScrollView
        style={{
          margin: 10,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
        }}
      >
        <View>
          <Text
            style={{fontSize: 20, color: COLORS.primary, fontWeight: '500'}}
          >
            User
          </Text>
          <FlatList
            data={listState}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              console.log('first***', checkUser.includes(item));
              return (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => handleCheck(item)}
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        marginTop: 10,
                      }}
                    >
                      {checkUser.includes(item) && (
                        <Text style={{textAlign: 'center'}}>✔️</Text>
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        marginHorizontal: 10,
                        ...FONTS.font1,
                        fontWeight: '500',
                      }}
                    >{`${item.name.replace('user-', '').toUpperCase()}`}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <TextButton
          label={'ADD ROLE'}
          contentContainerStyle={{
            ...FONTS.base,
            padding: 5,
            borderRadius: SIZES.radius,
            marginVertical: 50,
          }}
          labelStyle={{
            paddingVertical: 10,
          }}
          onPress={() => {
            editRole ? EditRole() : SubmitRole();
          }}
        />
      </ScrollView>
    </>
  );
};

export default AddRole;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
