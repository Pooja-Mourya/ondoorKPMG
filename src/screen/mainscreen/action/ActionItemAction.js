import {ActivityIndicator, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextButton from '../../../components/TextButton';
import {COLORS, constants, SIZES} from '../../../constants';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';

const STATUS = [
  {id: '1', status: 'In Progress'},
  {id: '2', status: 'Complete'},
  {id: '3', status: 'On Hold'},
  {id: '4', status: 'Not Started'},
  {id: '5', status: 'Cancelled'},
];

const ActionItemAction = ({setActionModal, actionModal}) => {
  const token = useSelector(state => state?.user?.user?.access_token);

  const [statusCode, setStatusCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listState, setListState] = useState([]);
  const [listId, setListId] = useState([]);

  const ActionHandler = async () => {
    const url = constants.endPoint.actionItemAction;
    const params = {
      ids: listId.map(m => m),
      action: statusCode.status,
    };

    console.log('param', params);
    try {
      setIsLoading(true);
      const actionItemResult = await ApiMethod.postData(url, params, token);
      if (actionItemResult) {
        setActionModal(false);
        handleActionList();
        setIsLoading(false);
        Alert.alert('Action item Action Update Successfully');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleActionList = async () => {
    const url = constants.endPoint.actionList;
    const params = {};
    setIsLoading(true);
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result.data?.data);
      setListState(result?.data?.data);
      setIsLoading(false);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleActionList();
  }, []);

  //   if (isLoading) return <ActivityIndicator />;
  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        width: 250,
      }}
    >
      <TouchableOpacity onPress={() => setActionModal(false)}>
        <AntDesign
          name="close"
          size={25}
          color={COLORS.dark}
          style={{
            backgroundColor: COLORS.light80,
            alignSelf: 'flex-end',
            borderRadius: 50,
            padding: 5,
          }}
        />
      </TouchableOpacity>

      <Text
        style={{
          textAlign: 'center',
          color: COLORS.primary,
          fontWeight: '700',
          fontSize: 20,
          marginVertical: 10,
        }}
      >
        ActionItemAction
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={STATUS}
        search
        maxHeight={300}
        labelField="status"
        valueField="id"
        placeholder="Select Status"
        searchPlaceholder="Search..."
        value={statusCode}
        onChange={item => {
          setStatusCode(item);
        }}
      />
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={listState}
        labelField="status"
        valueField="id"
        placeholder="Select ids"
        searchPlaceholder="Search..."
        value={listId}
        onChange={item => {
          setListId(item);
        }}
      />
      <TextButton
        label={'Submit'}
        contentContainerStyle={{
          height: 50,
          borderRadius: SIZES.radius,
          marginTop: 10,
        }}
        labelStyle={{
          color: COLORS.light,
        }}
        onPress={() => ActionHandler()}
      />
    </View>
  );
};

export default ActionItemAction;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 54,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
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
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
