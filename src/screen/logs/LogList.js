import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DataTable, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZES, constants} from '../../constants';
import ApiMethod from '../../Services/APIService';
import Header from '../../components/layout/Header';
import TextButton from '../../components/TextButton';
import moment from 'moment';
import {useCustomHook} from '../theme/ThemeContext';

const LogList = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  const [listState, setListState] = useState([]);
  const [filterModal, setFilterModal] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [pageRe, setPageRe] = useState(false);
  const [loader, setLoader] = useState(false);

  const userListApi = async (page, refresh) => {
    const url = constants.endPoint.logsList;
    const params = {
      page: page ? page : 1,
      per_page_record: '20',
    };
    const result = await ApiMethod.postData(url, params, token);
    //   console.log('result', result?.data?.data, 'url', url);

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
      Alert.alert('error in pagination');
    }
  };

  useEffect(() => {
    userListApi();
  }, []);

  //   console.log('listState', listState);
  //   if (isRefreshing === true) return <ActivityIndicator />;
  return (
    <>
      <Header
        userName={true}
        userTitle={true}
        textHeader={'Logs'}
        // leftIcon={true}
        menuBar={true}
        onPressArrow={() => navigation.toggleDrawer()}
        onPressSort={() => setFilterModal(!filterModal)}
        userProfile={true}
      />
      <View
        style={{
          backgroundColor: dark ? COLORS.light : COLORS.dark,
          //   borderWidth: !dark ? 1 : 1,
          //   borderColor: !dark ? COLORS.dark : COLORS.light,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            margin: SIZES.padding,
          }}
        >
          <View style={{flexDirection: 'column'}}>
            <View
              style={{flexDirection: 'row', backgroundColor: COLORS.primary}}
            >
              <Text style={styles.titleStyle}>S.No</Text>
              <Text style={styles.titleStyle}>User</Text>
              <Text style={styles.titleStyle}>Event</Text>
              <Text style={styles.titleStyle}>Type</Text>
              <Text style={styles.titleStyle}>Ip Address</Text>
              <Text style={styles.titleStyle}>Status</Text>
              <Text style={[styles.titleStyle, {width: 200}]}>
                Failure Reason
              </Text>
              <Text style={[styles.titleStyle, {width: 200}]}>Create Date</Text>
            </View>

            <View>
              <FlatList
                style={{marginTop: 20}}
                data={Array.isArray(listState) ? listState : null}
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
                          flexDirection: 'row',
                          borderWidth: dark ? 0 : 1,
                          borderColor: dark ? COLORS.dark : COLORS.light,
                        }}
                      >
                        <Text
                          style={[
                            styles.contentStyle,
                            {
                              color: dark ? COLORS.dark : COLORS.secondary,
                            },
                          ]}
                        >
                          {index + 1}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {color: dark ? COLORS.dark : COLORS.secondary},
                          ]}
                        >
                          {item.created_by.name}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {color: dark ? COLORS.dark : COLORS.secondary},
                          ]}
                        >
                          {item.event}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {color: dark ? COLORS.dark : COLORS.secondary},
                          ]}
                        >
                          {item.type}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {color: dark ? COLORS.dark : COLORS.secondary},
                          ]}
                        >
                          {item.ip_address}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {
                              color:
                                item.status === 'success'
                                  ? 'green'
                                  : COLORS.error,
                              backgroundColor:
                                item.status === 'success'
                                  ? COLORS.support3_08
                                  : COLORS.support4_08,
                            },
                          ]}
                        >
                          {item.status}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {
                              width: 200,
                              color: dark ? COLORS.light : COLORS.secondary,
                            },
                          ]}
                        >
                          {item.failure_reason ? item.failure_reason : 'NA'}
                        </Text>
                        <Text
                          style={[
                            styles.contentStyle,
                            {
                              width: 200,
                              color: dark ? COLORS.light : COLORS.secondary,
                            },
                          ]}
                        >
                          {moment(item.created_at).format('LLL')}
                        </Text>
                      </View>
                    </>
                  );
                }}
                onEndReached={() => {
                  userListApi(page + 1);
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (
                  <View style={{marginRight: 900, marginTop: 10}}>
                    {pageRe ? (
                      <ActivityIndicator size={'large'} color={'rosybrown'} />
                    ) : null}
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default LogList;

const styles = StyleSheet.create({
  titleStyle: {
    width: 150,
    color: COLORS.light,
    fontWeight: '500',
    textAlign: 'center',
    // borderWidth: 1,
    paddingVertical: 10,
  },
  contentStyle: {
    width: 150,
    color: COLORS.dark,
    fontWeight: '500',
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
