import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/layout/Header';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import {FAB} from 'react-native-paper';
import ApiMethod from '../../Services/APIService';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserFilter from './UserFilter';
import TextButton from '../../components/TextButton';
import {useCustomHook} from '../theme/ThemeContext';

const UserList = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  const [listState, setListState] = useState([]);
  const [filterData, setFilterData] = useState({}); //filter data
  const [filterModal, setFilterModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [pageRe, setPageRe] = useState(false);

  //   const userListApi = async () => {
  //     const url = constants.endPoint.userList;
  //     const params = {
  //       //   page: 1,
  //       //   per_page_record: '10',
  //     };
  //     setIsRefreshing(true);
  //     try {
  //       const result = await ApiMethod.postData(url, params, token);
  //       console.log('result', result?.data?.data, 'url', url);
  //       setListState(result?.data?.data);
  //       setIsRefreshing(false);
  //       return;
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  const userListApi = async (page, refresh) => {
    if (page) {
      setPageRe(true);
    } else if (refresh) {
      setIsRefreshing(false);
    } else {
      setLoader(false);
    }
    const url = constants.endPoint.userList;
    const params = {
      page: page ? page : 1,
      per_page_record: '10',
    };
    const result = await ApiMethod.postData(url, params, token);
    console.log('result', result?.data?.data, 'url', url);

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
      if (refresh) setIsRefreshing(false);
      Alert.alert('error in ');
    }
  };

  const handleDelete = async id => {
    setIsRefreshing(true);
    try {
      let url = constants.endPoint.user + '/' + id;
      //   console.log('deleteUrl', url);
      //   return;
      const deleteResult = ApiMethod.deleteData(url, null, token);
      console.log('deleteResult', deleteResult);
      userListApi();
      setIsRefreshing(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const userActionApi = item => {
    setIsRefreshing(true);
    try {
      let url = constants.endPoint.userAction;
      const params = {
        ids: [item.id],
        action: item.status === 1 ? 'inactive' : 'active',
      };
      const ActionResult = ApiMethod.postData(url, params, token);
      console.log('actionResult', ActionResult);
      userListApi();
      setIsRefreshing(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    userListApi();
  }, []);

  //   useEffect(() => {
  //     if (mode) {
  //       navigation.navigate('AuthMain');
  //     }
  //   }, []);
  //   if (isRefreshing === true) return <ActivityIndicator />;
  return (
    <>
      <Header
        userName={true}
        userTitle={true}
        textHeader={'User List'}
        // rightIcon={true}
        leftIcon={true}
        onPressArrow={() => navigation.toggleDrawer()}
        // onPressSort={() => setFilterModal(!filterModal)}
        userProfile={true}
      />

      <FlatList
        style={{backgroundColor: dark ? COLORS.light : COLORS.dark}}
        data={listState}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              userListApi(null, true);
            }}
          />
        }
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  backgroundColor: COLORS.light80,
                  margin: 10,
                  borderRadius: SIZES.radius,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    backgroundColor: COLORS.support1,
                    borderTopLeftRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '500',
                      paddingTop: 3,
                      ...FONTS.font1,
                      width: '50%',
                      color: COLORS.light,
                      textTransform: 'uppercase',
                      fontSize: 20,
                    }}
                  >
                    {item.name}
                  </Text>
                  {/* <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <AntDesign name="delete" size={20} color={COLORS.error} />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ViewUser', item)}
                  >
                    <AntDesign name="eyeo" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddUser', item)}
                  >
                    <AntDesign name="edit" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActionModal(true, item)}>
                    <MaterialCommunityIcons
                      name="list-status"
                      size={25}
                      color={COLORS.error}
                    />
                  </TouchableOpacity>
                </View>

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
                      backgroundColor: COLORS.light20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.secondary,
                        width: '80%',
                        borderRadius: SIZES.radius,
                        padding: SIZES.padding,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.font1,
                          fontSize: 18,
                          textAlign: 'center',
                        }}
                      >
                        {' '}
                        id : {item.id}
                      </Text>
                      <View
                        style={{
                          padding: 10,
                        }}
                      >
                        <View
                          style={{
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 25,
                          }}
                        >
                          <Text
                            style={{
                              marginTop: 0,
                              color: item.status == 2 ? 'green' : 'red',
                              ...FONTS.font1,
                              fontSize: 18,
                            }}
                          >
                            {!item.status == 2 ? `Activated` : 'Deactivated'}
                          </Text>
                          <Text style={{...FONTS.font1, fontSize: 18}}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TextButton
                          label={'yes'}
                          contentContainerStyle={{
                            padding: 10,
                            borderRadius: SIZES.radius,
                            width: '40%',
                          }}
                          onPress={() => {
                            userActionApi(item);
                            setActionModal(false);
                          }}
                        />
                        <TextButton
                          label={'no'}
                          contentContainerStyle={{
                            padding: 10,
                            borderRadius: SIZES.radius,
                            width: '40%',
                          }}
                          onPress={() => setActionModal(false)}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
                {/* <Text>Id: {item.id}</Text> */}

                <View
                  style={{
                    padding: SIZES.padding,
                    marginTop: -20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      paddingTop: 5,
                      ...FONTS.font1,
                      textAlign: 'center',
                      width: '100%',
                      fontSize: 20,
                    }}
                  >
                    {item.email}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      paddingTop: 7,
                      ...FONTS.body1,
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      fontSize: 18,
                      color: COLORS.primary,
                    }}
                  >
                    {item.designation}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{flexDirection: 'row', paddingTop: 3}}>
                      <AntDesign
                        name="phone"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text
                        style={{
                          fontWeight: '500',
                          ...FONTS.font1,
                          paddingHorizontal: 10,
                        }}
                      >
                        {item.mobile_number}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontWeight: '500',
                        paddingTop: 3,
                        ...FONTS.font1,
                        color: item.status == 1 ? 'green' : 'red',
                        backgroundColor:
                          item.status == 1
                            ? COLORS.support3_08
                            : COLORS.support4_08,
                        borderRadius: SIZES.radius,
                        padding: 5,
                      }}
                    >
                      {item.status == 1 ? 'active' : 'inactive'}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          );
        }}
        onEndReached={() => {
          userListApi(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <View style={{width: '100%', height: 30, justifyContent: 'center'}}>
            {pageRe ? (
              <ActivityIndicator size={'large'} color={'rosybrown'} />
            ) : null}
          </View>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddUser')}
      />

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={filterModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setFilterModal(!filterModal);
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
          }}
        >
          <View
            style={{
              marginBottom: 20,
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
              borderWidth: 5,
              borderColor: dark ? COLORS.secondary : COLORS.secondary20,
            }}
          >
            <UserFilter
              filterData={filterData}
              setFilterModal={setFilterModal}
              filterModal={filterModal}
            />
          </View>
        </View>
      </Modal> */}
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
