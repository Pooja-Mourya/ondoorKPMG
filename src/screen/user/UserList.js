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
import UserFilter from './UserFilter';

const UserList = ({navigation}) => {
  const token = useSelector(state => state?.user?.user);

  //   console.log('token', token);
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState({}); //filter data
  const [filterModal, setFilterModal] = useState(false);

  const userListApi = async () => {
    const url = constants.endPoint.userList;
    const params = {
      //   page: 1,
      //   per_page_record: '10',
    };
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data, 'url', url);
      setListState(result?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
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
  useEffect(() => {
    userListApi();
  }, [page]);

  //   useEffect(() => {
  //     if (mode) {
  //       navigation.navigate('AuthMain');
  //     }
  //   }, []);
  return (
    <>
      <Header
        userName={'Niharika'}
        userTitle={'manager'}
        searchBar={true}
        rightIcon={true}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
        onPressSort={() => setFilterModal(!filterModal)}
        userProfile={true}
      />

      <Text
        style={{
          ...FONTS.base,
          color: COLORS.primary,
          textAlign: 'center',
          fontSize: SIZES.h2,
          margin: 5,
        }}
      >
        Roles List
      </Text>
      <FlatList
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
        renderItem={({item}) => {
          return (
            <>
              <View
                style={{
                  backgroundColor: COLORS.support3_08,
                  margin: 10,
                  borderRadius: SIZES.radius,
                  padding: SIZES.padding,
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    width: '25%',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity>
                    <AntDesign name="delete" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesign name="eyeo" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesign name="edit" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.designation}</Text>
                <Text>{item.mobile_number}</Text>
              </View>
            </>
          );
        }}
        onEndReached={() => {
          //   console.log('load more');
          //   setPage(page + 1);
          userListApi(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <ActivityIndicator size={'large'} color={'rosybrown'} />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AuthMain')}
      />

      <Modal
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
            }}
          >
            <UserFilter
              filterData={filterData}
              setFilterModal={setFilterModal}
              filterModal={filterModal}
            />
          </View>
        </View>
      </Modal>
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
