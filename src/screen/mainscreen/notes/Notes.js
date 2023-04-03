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
import {FAB, RadioButton} from 'react-native-paper';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {Modal} from 'react-native';
//   import MeetingFilter from './MeetingFilter';
import MeetingFilter from '../meeting/MeetingFilter';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AddNotes} from '../..';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCallback} from 'react';
import ViewNotes from './ViewNotes';
import TextButton from '../../../components/TextButton';

const Notes = ({navigation}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState({}); //filter data
  const [filterModal, setFilterModal] = useState(false);
  const [addNotesModal, setAddNotesModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [iconModal, setIconModal] = useState('');
  const [lengthMore, setLengthMore] = useState('');
  const [textShown, setTextShown] = useState(false);
  const [editable, setEditable] = useState([]);
  const [actionModal, setActionModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const handelNotesList = async () => {
    const url = constants.endPoint.notes;
    const params = {
      page: 1,
      per_page_record: '10',
    };
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data?.data, 'url', url);
      setListState(result?.data?.data?.data);
      setIsRefreshing(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDelete = async id => {
    const url = constants.endPoint.note + '/' + id;
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.deleteData(url, null, token);
      console.log('result', result?.data?.data);
      //   setListState(result?.data?.data);
      handelNotesList();
      setIsRefreshing(false);
      Alert.alert('Data Deleted Successfully');
    } catch (error) {
      console.log('error', error);
    }
  };

  const NoteAction = async () => {
    const url = constants.endPoint.noteAction;
    const params = {
      ids: [listState[0].id],
      action: listState[0].status === 1 ? 'inactive' : 'active',
    };
    // console.log('parasdhbk', params);
    console.log('listState.id', listState);
    console.log('listState.status', listState);
    try {
      const ActionRes = await ApiMethod.postData(url, params, token);
      if (ActionRes) {
        Alert.alert('Note Action Update Successfully');
        setActionModal(false);
        handelNotesList();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handelNotesList();
    // console.log('first', listState[0].id);
  }, [page]);

  const onTextLayout = e => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  };

  return (
    <>
      <Header
        userName={true}
        userTitle={true}
        textHeader={'Note List'}
        rightIcon={true}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
        onPressSort={() => setFilterModal(!filterModal)}
        userProfile={true}
      />

      <FlatList
        data={listState}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              handelNotesList(null, true);
            }}
          />
        }
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  backgroundColor: COLORS.support3_08,
                  margin: 10,
                  borderRadius: SIZES.radius,
                  borderRightWidth: 5,
                  borderRightColor: COLORS.primary,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.secondary,
                    borderTopRightRadius: SIZES.radius,
                    padding: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setIconModal(index);
                    }}
                    style={{
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      marginTop: 10,
                    }}
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={30}
                      color={COLORS.dark}
                    />
                  </TouchableOpacity>

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
                      {item.created_by.name}{' '}
                    </Text>
                  </View>
                </View>

                <View style={{padding: SIZES.padding}}>
                  {iconModal === index ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        margin: 40,
                        position: 'absolute',
                        backgroundColor: COLORS.support1,
                        borderBottomRightRadius: SIZES.radius,
                        borderTopLeftRadius: SIZES.radius,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'space-around',
                          flexDirection: 'row',
                        }}
                      >
                        {/* <TouchableOpacity
                        onPress={() => {
                          handleDelete(item.id);
                          navigation.navigate('Notes');
                        }}
                      >
                        <AntDesign
                          name="delete"
                          size={20}
                          color={COLORS.error}
                        />
                      </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('ViewNotes', item);
                            setIconModal(false);
                          }}
                        >
                          <AntDesign
                            name="eyeo"
                            size={25}
                            color={COLORS.support3}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setAddNotesModal(true, item.id);
                            setEditable(item);
                            setIconModal(false);
                          }}
                        >
                          <AntDesign
                            name="edit"
                            size={20}
                            color={COLORS.support3}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setActionModal(true, item);
                            setIconModal(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="list-status"
                            size={20}
                            color={COLORS.error}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  <View style={{}}>
                    <Text
                      numberOfLines={2}
                      style={{...FONTS.base, fontWeight: '400', height: 40}}
                    >
                      {item?.meeting?.agenda_of_meeting}
                    </Text>
                  </View>

                  <Text
                    style={{
                      width: '100%',
                      ...FONTS.base,
                      fontWeight: '700',
                      textAlign: 'center',
                      marginTop: 10,
                    }}
                  >
                    Decision
                  </Text>
                  <Text
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                    style={{
                      lineHeight: 21,
                      height: 45,
                      ...FONTS.font1,
                      fontWeight: '400',
                    }}
                  >
                    {item.decision}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        borderRadius: SIZES.radius,
                        ...FONTS.font1,
                        color: COLORS.dark,
                        fontWeight: '500',
                      }}
                    >
                      Duration: {item.duration}
                    </Text>
                    <Text
                      style={{
                        color: item.status == 2 ? 'red' : 'green',
                        backgroundColor:
                          item.status == 2
                            ? COLORS.support4_08
                            : COLORS.support3_08,
                        padding: 5,
                        borderRadius: SIZES.radius,
                        ...FONTS.font1,
                      }}
                    >
                      {item.status == 1 ? 'active' : 'inactive'}
                    </Text>
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
                          backgroundColor: COLORS.light08,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: COLORS.secondary,
                            width: '80%',
                            padding: 30,
                            borderRadius: SIZES.radius,
                          }}
                        >
                          <Text
                            style={{
                              ...FONTS.font1,
                              fontSize: 18,
                              textAlign: 'center',
                            }}
                          >
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
                                {!item.status == 2
                                  ? `Activated`
                                  : 'Deactivated'}
                              </Text>
                              <Text style={{...FONTS.font1, fontSize: 18}}>
                                {item.created_by.email}
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
                              onPress={() => NoteAction()}
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
                  </View>
                </View>

                {/* {!lengthMore ? (
                  <Text
                    onPress={() => setAgendaText(agendaText)}
                    style={{
                      lineHeight: 21,
                      marginTop: 10,
                      color: COLORS.support5,
                    }}
                  >
                    {agendaText ? 'Read less...' : 'Read more...'}
                  </Text>
                ) : null} */}
              </View>
            </>
          );
        }}
        onEndReached={() => {
          handelNotesList(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <ActivityIndicator size={'large'} color={'rosybrown'} />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setAddNotesModal(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModal}
        onRequestClose={() => {
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

      {/* add notes modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addNotesModal}
        onRequestClose={() => {
          setAddNotesModal(!addNotesModal);
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            // padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
          }}
        >
          <View
            style={{
              flex: 1,
              //   marginBottom: 20,
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <AddNotes
              addNotesModal={addNotesModal}
              setAddNotesModal={setAddNotesModal}
              editable={editable}
              setEditable={setEditable}
            />
          </View>
        </View>
      </Modal>

      {/* notes view modal  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={viewModal}
        onRequestClose={() => {
          setViewModal(!viewModal);
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            // padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
          }}
        >
          <View
            style={{
              flex: 1,
              //   marginBottom: 20,
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <ViewNotes viewModal={viewModal} setViewModal={setViewModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Notes;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
