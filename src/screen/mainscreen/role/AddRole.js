import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import TextButton from '../../../components/TextButton';
import FormInput from '../../../components/FormInput';
import CheckBox from '../../../components/CheckBox';
import {Dimensions} from 'react-native';
import {ToastAndroid} from 'react-native';

const AddRole = props => {
  const {navigation} = props;

  const editRole = props.route.params;

  const token = useSelector(state => state?.user?.user?.access_token);
  const [enableCheck, setEnableCheck] = useState('');
  const [se_name, setSe_name] = useState([]);
  const [checkUser, setCheckUser] = useState([]);
  const [role, setRole] = useState({});
  const [loader, setLoader] = useState(false);

  const handleRoles = async () => {
    const url = constants.endPoint.permissions;
    const params = {};
    try {
      setLoader(true);
      const result = await ApiMethod.postData(url, params, token);
      let obj = {};
      result?.data?.data.map(item => {
        if (obj[item.group_name]) {
          obj[item.group_name].push(item);
        } else {
          obj[item.group_name] = [item];
        }
      });
      console.log('res---------', obj);
      setRole(obj);
      setLoader(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const SubmitRole = async () => {
    let url = constants.endPoint.role;
    let params = {
      se_name: se_name,
      permissions: [checkUser.map(n => ({name: n.se_name}))],
    };

    console.log('params', params);
    return;
    try {
      const preResult = await ApiMethod.postData(url, params, token);
      if (preResult) {
        navigation.navigate('Roles');
        ToastAndroid.shoe(
          'permission recorded successfully',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const EditRole = async () => {
    let url = constants.endPoint.role + '/' + editRole.id;
    let params = {
      se_name: se_name,
      permissions: [
        // checkAction.map(n => ({name: n.se_name})),
        // checkMeeting.map(n => ({name: n.se_name})),
        // checkNotification.map(n => ({name: n.se_name})),
        checkUser.map(n => ({name: n.se_name})),
        // checkRole.map(n => ({name: n.se_name})),
      ],
    };

    try {
      const preResult = await ApiMethod.putData(url, params, token);
      if (preResult) {
        navigation.navigate('Roles');
        ToastAndroid.shoe(
          'permission updated successfully',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCheck = selectCheck => {
    if (checkUser.includes(selectCheck)) {
      setCheckUser(checkUser.filter(checkValue => checkValue !== selectCheck));
      return;
    }
    setCheckUser(d => d.concat(selectCheck));
  };

  const colorChanger = () => {
    let mixColor = Math.floor(Math.random() * 1000);
    return mixColor;
  };

  useEffect(() => {
    handleRoles();
  }, []);

  useEffect(() => {
    if (editRole) {
      setSe_name(editRole.se_name);
    }
  }, []);

  return (
    <>
      <Header
        textHeader={editRole ? 'EDIT ROLE' : 'ADD ROLE'}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <View style={{margin: 12}}>
        <TouchableOpacity>
          <CheckBox
            CheckBoxText={'SELECT ALL'}
            containerStyle={{backgroundColor: '', lineHeight: 20}}
            isSelected={enableCheck}
            onPress={() => {
              setEnableCheck(!enableCheck);
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={false}>
        {Object.keys(role).map((e, i) => {
          return (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: '500',
                  marginTop: 10,
                  textTransform: 'uppercase',
                  marginHorizontal: 10,
                }}
              >
                {e}
              </Text>
              {/* <FlatList
                numColumns={3}
                data={role[e]}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <>
                      <View
                        style={{
                          //   minWidth: Dimensions.get('window').width * 0.4,
                          flexDirection: 'row',
                          backgroundColor: COLORS.light20,
                          padding: 10,
                          margin: 5,
                          borderRadius: SIZES.radius,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => handleCheck(item)}
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            //   marginTop: 10,
                          }}
                        >
                          {checkUser.includes(item) || enableCheck ? (
                            <AntDesign
                              name="checksquare"
                              size={20}
                              color={COLORS.primary}
                            />
                          ) : null}
                        </TouchableOpacity>

                        <Text
                          style={{
                            // marginTop: 10,
                            marginHorizontal: 10,
                            ...FONTS.font1,
                            fontWeight: '500',
                          }}
                        >
                          {`${item.name.replace(`${e}-`, '').toUpperCase()}`}
                        </Text>
                      </View>
                    </>
                  );
                }}
              /> */}

              <View
                style={{
                  backgroundColor: colorChanger(),
                  margin: 10,
                  borderRadius: SIZES.radius,
                }}
              >
                {role[e].map(item => {
                  return (
                    <>
                      <ScrollView horizontal={true}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                          }}
                        >
                          <View
                            style={{
                              //   width: '100%',
                              flexDirection: 'row',
                              backgroundColor: COLORS.light20,
                              padding: 10,
                              margin: 5,
                              borderRadius: SIZES.radius,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => handleCheck(item, enableCheck)}
                              style={{
                                width: 20,
                                height: 20,
                                borderWidth: 1,
                                //   marginTop: 10,
                              }}
                            >
                              {checkUser.includes(item) || enableCheck ? (
                                <AntDesign
                                  name="checksquare"
                                  size={20}
                                  color={COLORS.primary}
                                />
                              ) : null}
                            </TouchableOpacity>

                            <Text
                              style={{
                                // marginTop: 10,
                                marginHorizontal: 10,
                                ...FONTS.font1,
                                fontWeight: '500',
                              }}
                            >
                              {`${item.name
                                .replace(`${e}-`, '')
                                .toUpperCase()}`}
                            </Text>
                          </View>
                          <Text></Text>
                        </View>
                      </ScrollView>
                    </>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {loader ? <ActivityIndicator /> : null}
      <ScrollView style={{margin: 10, height: 180}}>
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            // height: 50,
            borderBottomWidth: 1,
          }}
          placeholder="Name"
          value={['se_name']}
          // error={errors.name}
          // onFocus={e => handleError(e, 'name')}
          onChange={n => setSe_name(n)}
          prependComponent={
            <AntDesign name="user" size={25} color={COLORS.grey} />
          }
        />

        <TextButton
          label={'ADD ROLE'}
          contentContainerStyle={{
            ...FONTS.base,
            padding: 5,
            borderRadius: SIZES.radius,
            marginVertical: 15,
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
