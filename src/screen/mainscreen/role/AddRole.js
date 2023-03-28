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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import TextButton from '../../../components/TextButton';
import FormInput from '../../../components/FormInput';

const DESIGNATION = [
  {
    id: '1',
    title: 'User',
  },
  {
    id: '2',
    title: 'Role',
  },
  {
    id: '3',
    title: 'Meeting',
  },
  {
    id: '4',
    title: 'Action',
  },
  {
    id: '5',
    title: 'Notification',
  },
];

const AddRole = props => {
  const {navigation} = props;

  const editRole = props.route.params;

  const token = useSelector(state => state?.user?.user?.access_token);

  const [selected, setSelected] = useState([]);
  const [se_name, setSe_name] = useState([]);

  const [checkUser, setCheckUser] = useState([]);
  const [checkRole, setCheckRole] = useState([]);
  const [checkMeeting, setCheckMeeting] = useState([]);
  const [checkAction, setCheckAction] = useState([]);
  const [checkNotification, setCheckNotification] = useState([]);

  const [listState, setListState] = useState();
  const [role, setRole] = useState();
  const [meeting, setMeeting] = useState();
  const [action, setAction] = useState();
  const [notification, setNotification] = useState();

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
      setRole(obj.role);
      setMeeting(obj.meeting);
      setAction(obj['action-items']);
      setNotification(obj.notifications);

      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  const SubmitRole = async () => {
    let url = constants.endPoint.role;
    let params = {
      se_name: se_name,
      permissions: [
        checkAction.map(n => ({name: n.se_name})),
        checkMeeting.map(n => ({name: n.se_name})),
        checkNotification.map(n => ({name: n.se_name})),
        checkUser.map(n => ({name: n.se_name})),
        checkRole.map(n => ({name: n.se_name})),
      ],
    };
    console.log('params', params);
    // return;
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
      se_name: se_name,
      permissions: [
        checkAction.map(n => ({name: n.se_name})),
        checkMeeting.map(n => ({name: n.se_name})),
        checkNotification.map(n => ({name: n.se_name})),
        checkUser.map(n => ({name: n.se_name})),
        checkRole.map(n => ({name: n.se_name})),
      ],
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
    if (checkUser.includes(selectCheck)) {
      setCheckUser(checkUser.filter(checkValue => checkValue !== selectCheck));
      return;
    }
    setCheckUser(d => d.concat(selectCheck));
  };

  const handleCheckRole = selectCheck => {
    if (checkRole.includes(selectCheck)) {
      setCheckRole(checkRole.filter(checkValue => checkValue !== selectCheck));
      return;
    }
    setCheckRole(d => d.concat(selectCheck));
  };

  const handleCheckMeeting = selectCheck => {
    if (checkMeeting.includes(selectCheck)) {
      setCheckMeeting(
        checkMeeting.filter(checkValue => checkValue !== selectCheck),
      );
      return;
    }
    setCheckMeeting(d => d.concat(selectCheck));
  };

  const handleCheckAction = selectCheck => {
    if (checkAction.includes(selectCheck)) {
      setCheckAction(
        checkAction.filter(checkValue => checkValue !== selectCheck),
      );
      return;
    }
    setCheckAction(d => d.concat(selectCheck));
  };

  const handleCheckNotification = selectCheck => {
    if (checkNotification.includes(selectCheck)) {
      setCheckNotification(
        checkNotification.filter(checkValue => checkValue !== selectCheck),
      );
      return;
    }
    setCheckNotification(d => d.concat(selectCheck));
  };

  useEffect(() => {
    handleRoles();
  }, []);
  useEffect(() => {
    if (editRole) {
      //   setSelected(editRole.selected);
      setSe_name(editRole.se_name);
    }
  }, []);
  return (
    <>
      <Header textHeader={editRole ? 'EDIT ROLE' : 'ADD ROLE'} />
      <ScrollView
        style={{
          margin: 10,
        }}
      >
        <View style={{marginHorizontal: 10}}>
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              borderWidth: 1,
            }}
            placeholder="Name"
            value={se_name}
            // error={errors.name}
            // onFocus={e => handleError(e, 'name')}
            onChange={n => setSe_name(n)}
            prependComponent={
              <AntDesign name="user" size={25} color={COLORS.grey} />
            }
          />
          <FlatList
            data={DESIGNATION}
            keyExtractor={item => item.id}
            renderItem={it => {
              return (
                <>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.primary,
                      fontWeight: '500',
                      marginTop: 10,
                    }}
                  >
                    {it.item.title}
                  </Text>
                  {it.index == 0 && (
                    <FlatList
                      style={{
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        backgroundColor: COLORS.secondary80,
                        borderRadius: SIZES.radius,
                      }}
                      data={listState}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => {
                        return (
                          <>
                            <View
                              style={{
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
                                {checkUser.includes(item) && (
                                  <AntDesign
                                    name="checksquare"
                                    size={20}
                                    color={COLORS.primary}
                                  />
                                )}
                              </TouchableOpacity>
                              <View>
                                <Text
                                  style={{
                                    // marginTop: 10,
                                    marginHorizontal: 10,
                                    ...FONTS.font1,
                                    fontWeight: '500',
                                  }}
                                >
                                  {`${item.name
                                    .replace('user-', '')
                                    .toUpperCase()}`}
                                </Text>
                              </View>
                            </View>
                          </>
                        );
                      }}
                    />
                  )}

                  {it.index == 1 && (
                    <FlatList
                      style={{
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        backgroundColor: COLORS.secondary60,
                        borderRadius: SIZES.radius,
                      }}
                      data={role}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => {
                        return (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                backgroundColor: COLORS.light20,
                                padding: 10,
                                margin: 5,
                                borderRadius: SIZES.radius,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => handleCheckRole(item)}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderWidth: 1,
                                }}
                              >
                                {checkRole.includes(item) && (
                                  <AntDesign
                                    name="checksquare"
                                    size={20}
                                    color={COLORS.primary}
                                  />
                                )}
                              </TouchableOpacity>
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  ...FONTS.font1,
                                  fontWeight: '500',
                                }}
                              >{`${item.name
                                .replace('role-', '')
                                .toUpperCase()}`}</Text>
                            </View>
                          </>
                        );
                      }}
                    />
                  )}
                  {it.index == 2 && (
                    <FlatList
                      style={{
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        backgroundColor: COLORS.secondary20,
                        borderRadius: SIZES.radius,
                      }}
                      data={meeting}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => {
                        return (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                backgroundColor: COLORS.light20,
                                padding: 10,
                                // margin: 5,
                                borderRadius: SIZES.radius,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => handleCheckMeeting(item)}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderWidth: 1,
                                }}
                              >
                                {checkMeeting.includes(item) && (
                                  <AntDesign
                                    name="checksquare"
                                    size={20}
                                    color={COLORS.primary}
                                  />
                                )}
                              </TouchableOpacity>
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  ...FONTS.font1,
                                  fontWeight: '500',
                                }}
                              >{`${item.name
                                .replace('meeting-', '')
                                .toUpperCase()}`}</Text>
                            </View>
                          </>
                        );
                      }}
                    />
                  )}
                  {it.index == 3 && (
                    <FlatList
                      style={{
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        backgroundColor: COLORS.lightGrey,
                        borderRadius: SIZES.radius,
                      }}
                      data={action}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => {
                        return (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                backgroundColor: COLORS.light20,
                                padding: 5,
                                margin: 5,
                                borderRadius: SIZES.radius,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => handleCheckAction(item)}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderWidth: 1,
                                }}
                              >
                                {checkAction.includes(item) && (
                                  <AntDesign
                                    name="checksquare"
                                    size={20}
                                    color={COLORS.primary}
                                  />
                                )}
                              </TouchableOpacity>
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  ...FONTS.font1,
                                  fontWeight: '500',
                                }}
                              >{`${item.name
                                .replace('action-items-', '')
                                .toUpperCase()}`}</Text>
                            </View>
                          </>
                        );
                      }}
                    />
                  )}
                  {it.index == 4 && (
                    <FlatList
                      style={{
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        backgroundColor: COLORS.lightGrey80,
                        borderRadius: SIZES.radius,
                      }}
                      data={notification}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => {
                        return (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                backgroundColor: COLORS.light20,
                                padding: 5,
                                margin: 5,
                                borderRadius: SIZES.radius,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => handleCheckNotification(item)}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderWidth: 1,
                                }}
                              >
                                {checkNotification.includes(item) && (
                                  <AntDesign
                                    name="checksquare"
                                    size={20}
                                    color={COLORS.primary}
                                  />
                                )}
                              </TouchableOpacity>
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  ...FONTS.font1,
                                  fontWeight: '500',
                                }}
                              >{`${item.name
                                .replace('notifications-', '')
                                .toUpperCase()}`}</Text>
                            </View>
                          </>
                        );
                      }}
                    />
                  )}
                </>
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
