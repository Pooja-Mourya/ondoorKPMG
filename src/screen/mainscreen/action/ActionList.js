import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import {FAB, RadioButton} from 'react-native-paper';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import ActionFilter from './ActionFilter';
import TextButton from '../../../components/TextButton';
import {Dropdown} from 'react-native-element-dropdown';
import ActionItemAction from './ActionItemAction';
import ActionById from './ActionById';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import {useCustomHook} from '../../theme/ThemeContext';

const ActionList = props => {
  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  const {navigation} = props;
  const [listState, setListState] = useState([]);

  const [actionModal, setActionModal] = useState(false);
  const [actionItem, setActionItem] = useState({});
  const [actionData, setActionData] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [pageRe, setPageRe] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [moveById, setMoveById] = useState(false);
  const [state, setState] = useState({
    ids: '',
    action: '',
    percent: '',
  });

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleActionList = async (page, refresh) => {
    if (page) {
      setPageRe(true);
    } else if (refresh) {
      setIsRefreshing(true);
    } else {
      setLoader(true);
    }
    const url = constants.endPoint.actionList;
    const params = {
      page: page ? page : 1,
      per_page_record: '10',
    };
    const result = await ApiMethod.postData(url, params, token);
    // console.log('result', result?.data?.data);
    if (result) {
      if (!page) {
        setPage(1);
        setListState(result?.data?.data?.data);
        setLoader(false);
        if (refresh) setIsRefreshing(false);
      } else {
        let temp = [...listState];
        temp = temp.concat(result?.data?.data?.data);
        setPage(page);
        setListState([...temp]);
        setPageRe(false);
      }
    } else {
      if (!page) setLoader(false);
      else setPageRe(false);
      if (!refresh) setIsRefreshing(false);
      ToastAndroid.show('error in action pagination', ToastAndroid.SHORT);
    }
  };

  const ActionHandler = async item => {
    const url = constants.endPoint.actionItemAction;
    const params = {
      ids: item.id,
      action: state.action,
      percent: state.percent,
    };

    console.log('params', params);
    setLoader(true);

    // return;
    try {
      const ActionRes = await ApiMethod.postData(url, params, token);
      if (ActionRes) {
        Alert.alert('Action item Action Update Successfully');
      }
      setLoader(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleActionList();
  }, [page]);

  return (
    <>
      <Header
        userName={true}
        userTitle={true}
        textHeader={'Action List '}
        rightIcon={true}
        leftIcon={true}
        onPressArrow={() => navigation.toggleDrawer()}
        onPressSort={() => setActionModal(true)}
        userProfile={true}
      />

      <View style={{marginHorizontal: 20}}>
        {loader ? (
          <ActivityIndicator color={!dark ? COLORS.light : COLORS.dark} />
        ) : null}
      </View>

      <FlatList
        style={{backgroundColor: dark ? COLORS.light : COLORS.dark}}
        data={listState}
        // data={Array.isArray(listState) ? listState : []}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              handleActionList(null, true);
            }}
          />
        }
        renderItem={({item, index}) => {
          //   console.log('item', item);
          return (
            <>
              <View
                style={{
                  backgroundColor: dark ? COLORS.support3_08 : COLORS.secondary,
                  margin: 10,
                  borderRadius: SIZES.radius,

                  borderLeftWidth: 5,
                  borderLeftColor: COLORS.secondary,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: dark ? COLORS.secondary : COLORS.light,
                    padding: 15,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                  }}
                >
                  <Text
                    style={{
                      width: '85%',
                      color: COLORS.primary,
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      ...FONTS.font1,
                    }}
                  >
                    {item.meeting.meeting_title}
                  </Text>
                  <TouchableOpacity>
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color={COLORS.dark}
                      onPress={() => setNewModal(index)}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{padding: SIZES.padding}}
                  //   onPress={() => navigation.navigate('ViewMeeting', item)}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          item.priority === 'high'
                            ? // ? item.priority === 'medium'
                              // : COLORS.success
                              COLORS.error
                            : COLORS.error20,
                        fontWeight: '500',
                        fontSize: 16,
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.priority}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.font1,
                        fontWeight: '600',
                        color: 'black',
                        marginTop: 5,
                      }}
                    >
                      {item.date_opened}
                    </Text>
                  </View>

                  <Text
                    style={{
                      ...FONTS.base,
                      fontWeight: '500',
                      fontSize: 14,
                      textTransform: 'capitalize',
                      marginTop: 5,
                      height: 40,
                    }}
                    numberOfLines={2}
                  >
                    {item.task}
                  </Text>
                  {/* <View style={{marginTop: 5}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.body4,
                        fontWeight: '500',
                        height: 60,
                        // textAlign: 'center',
                        marginTop: 5,
                      }}
                    >
                      {item.comment}
                    </Text>
                  </View> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}
                  >
                    <Text style={{fontWeight: '600'}}>
                      {item.complete_percentage} %
                    </Text>

                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        style={{
                          // width: '50%',
                          backgroundColor: COLORS.secondary,
                          color:
                            item.status === 'in_progress'
                              ? COLORS.primary
                              : item.status === 'on_hold'
                              ? COLORS.success
                              : item.status === 'pending'
                              ? COLORS.support1
                              : item.status === 'cancelled'
                              ? COLORS.error
                              : item.status === 'completed' && 'green',

                          padding: 5,
                          borderRadius: SIZES.padding,
                          backgroundColor:
                            item.status === 'in_progress'
                              ? COLORS.primary20
                              : item.status === 'on_hold'
                              ? COLORS.dark20
                              : item.status === 'cancelled'
                              ? COLORS.error20
                              : item.status === 'pending'
                              ? COLORS.success20
                              : item.status === 'completed' &&
                                COLORS.support4_08,
                        }}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {newModal === index ? (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      width: '100%',
                      paddingHorizontal: 20,
                      justifyContent: 'space-between',
                      position: 'absolute',
                      backgroundColor: COLORS.primary,
                      //   marginTop: 60,
                      //   height: 145,
                      height: '100%',
                      borderRadius: SIZES.radius,
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity style={{}}>
                      <AntDesign
                        name="close"
                        size={25}
                        color={COLORS.light}
                        onPress={() => setNewModal(false)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}}>
                      <MaterialCommunityIcons
                        name="list-status"
                        size={25}
                        color={COLORS.error}
                        onPress={() => {
                          setMoveById(true, item);
                          setActionData(item);
                          setNewModal(false);
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ViewActionItem', item)
                      }
                    >
                      <AntDesign name="eyeo" size={25} color={COLORS.light} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('AddActionItem', item)}
                    >
                      <AntDesign name="edit" size={25} color={COLORS.success} />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </>
          );
        }}
        onEndReached={() => {
          handleActionList(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <View style={{}}>
            {pageRe ? (
              <ActivityIndicator size={'large'} color={'rosybrown'} />
            ) : null}
          </View>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddActionItem')}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={moveById}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setMoveById(!moveById);
        }}
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
            justifyContent: 'center',
            // marginHorizontal: 50,
          }}
        >
          <View
            style={{
              //   width: '70%',
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <ActionById
              moveById={moveById}
              setMoveById={setMoveById}
              actionData={actionData}
              setActionData={setActionData}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={actionModal}
        onRequestClose={() => {
          setActionModal(!actionModal);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.light80,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActionItemAction
            setActionModal={setActionModal}
            actionModal={actionModal}
            actionItem={actionItem}
          />
        </View>
      </Modal>
    </>
  );
};

export default ActionList;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    // height: 54,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 5,
    shadowColor: '#000',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    // padding: 17,
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
    // width: 20,
    // height: 20,
  },
  inputSearchStyle: {
    // height: 20,
    // fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
