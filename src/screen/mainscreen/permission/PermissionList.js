import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import moment from 'moment';
import {FAB} from 'react-native-paper';
import AddPermission from './AddPermission';
import {useCustomHook} from '../../theme/ThemeContext';
import Header from '../../../components/layout/Header';

const PermissionList = props => {
  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  //   console.log('token', token);

  const {navigation} = props;
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [addPreModal, setAddPreModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [activeStatus, setActiveStatus] = useState('1');

  console.log('listState', listState);
  const PermissionListFunction = async () => {
    const url = constants.endPoint.permissions;
    const params = {
      page: 1,
      per_page_record: '10',
    };
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data, 'url', url);
      setListState(result?.data?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    PermissionListFunction();
  }, [page]);
  return (
    <>
      <Header
        textHeader={'DASHBOARD'}
        leftIcon={true}
        onPressArrow={() => navigation.toggleDrawer()}
      />
      <FlatList
        // data={
        //   Array.isArray(listState)
        //     ? listState.filter(e => e.status == activeStatus)
        //     : []
        // }
        style={{
          marginBottom: 30,
          backgroundColor: dark ? COLORS.light : COLORS.dark,
        }}
        data={listState}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              PermissionListFunction(null, true);
            }}
          />
        }
        renderItem={({item}) => {
          const create = moment(item.created_at).format('L');
          const update = moment(item.updated_at).format('L');
          return (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: dark ? COLORS.secondary : COLORS.support1,
                  margin: 10,
                  borderRadius: SIZES.radius,
                  padding: SIZES.padding,
                  borderLeftWidth: 5,
                  borderLeftColor:
                    activeStatus == '1' ? COLORS.primary : COLORS.secondary,
                }}
                onPress={() => navigation.navigate('ViewPermission', item)}
              >
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: '85%',
                      color: COLORS.primary,
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      ...FONTS.font1,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...FONTS.base, fontWeight: '500'}}>
                    {item.guard_name}
                  </Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={{...FONTS.body4, fontWeight: '500'}}>
                    {item.se_name}
                  </Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={{...FONTS.body4, fontWeight: '500'}}>
                    {item.group_name}
                  </Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Text
                    numberOfLines={3}
                    style={{...FONTS.body4, fontWeight: '500'}}
                  >
                    {item.description == null ? null : item.description}
                  </Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={{...FONTS.body4, fontWeight: '500'}}>
                    {item.belongs_to}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{...FONTS.font1, fontWeight: '600', color: 'black'}}
                  >
                    Create: {create}
                  </Text>
                  <Text
                    style={{...FONTS.font1, fontWeight: '600', color: 'black'}}
                  >
                    Update: {update}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
        // onEndReached={() => {
        //   //   console.log('load more');
        //   //   setPage(page + 1);
        //   PermissionListFunction(page + 1);
        // }}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={() => (
        //   <ActivityIndicator size={'large'} color={'rosybrown'} />
        // )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddPermission')}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={addPreModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setAddPreModal(!addPreModal);
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
            <AddPermission
              addPreModal={addPreModal}
              setAddPreModal={setAddPreModal}
              editModalData={editModalData}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PermissionList;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 30,
  },
});
