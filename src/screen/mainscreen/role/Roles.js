import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import {FAB} from 'react-native-paper';
import ApiMethod from '../../../Services/APIService';

import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {Modal} from 'react-native';
// import MeetingFilter from './MeetingFilter';
import MeetingFilter from '../meeting/MeetingFilter';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Meeting = ({navigation}) => {
  const token = useSelector(state => state?.user?.user);
  console.log('token', token);
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState({}); //filter data
  const [filterModal, setFilterModal] = useState(false);

  const handleRoles = async () => {
    const url = constants.endPoint.roles;
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

  useEffect(() => {
    handleRoles();
  }, [page]);
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
      <View style={{}}>
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
      </View>

      {/* <FlatList
        data={listState}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              handleRoles();
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
                }}
              >
                <View>
                  <TouchableOpacity onPress={() => {}}>
                    <AntDesign name="delete" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ViewMeeting', item)}
                  >
                    <AntDesign name="eyeo" size={20} color={COLORS.support3} />
                  </TouchableOpacity>
                </View>

                <Text>{item.name}</Text>
                <Text>{item.se_name}</Text>
              </View>
            </>
          );
        }}
        onEndReached={() => {
          handleRoles(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <ActivityIndicator size={'large'} color={'rosybrown'} />
        )}
      /> */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddMeeting')}
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
            <MeetingFilter
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

export default Meeting;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
