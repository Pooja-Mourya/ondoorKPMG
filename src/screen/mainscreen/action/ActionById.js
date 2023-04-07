import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import ApiMethod from '../../../Services/APIService';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextButton from '../../../components/TextButton';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {Modal} from 'react-native';
import FormInput from '../../../components/FormInput';

const DATA = [
  {
    id: '0',
    action: 'in_progress',
  },
  {
    id: '1',
    action: 'completed',
  },
  {
    id: '2',
    action: 'on_hold',
  },
  {
    id: '3',
    action: 'not_started',
  },
  {
    id: '4',
    action: 'cancelled',
  },
];

const ActionById = ({moveById, setMoveById, actionData}) => {
  //   console.log('actionData', actionData.id);
  const token = useSelector(state => state?.user?.user?.access_token);

  const [state, setState] = useState({
    ids: '',
    action: '',
    percent: '',
  });
  const [progressModal, setProgressModal] = useState(false);

  const onchangeState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const ActionHandler = async item => {
    // console.log('itemApi', item);

    // return;
    const url = constants.endPoint.actionItemAction;
    const params = {
      ids: [actionData.id],
      action: [item],
      percent: state.percent,
    };

    console.log('params', params);

    try {
      const ActionRes = await ApiMethod.postData(url, params, token);
      if (ActionRes) {
        Alert.alert('Action item Action Update Successfully');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const selectActionHandler = (index, key) => {
    // console.log('key', key);
    if (index == 0) {
      Alert.alert('set percentage', `what you want ${key}`, [
        {
          text: 'ok',
          onPress: () => {
            setProgressModal(!progressModal);
          },
        },
        {
          text: 'cancel',
        },
      ]);
    }
    if (index == 1) {
      Alert.alert('Update Status', `${key}`, [
        {
          text: 'ok',
          onPress: () => {
            ActionHandler(key);
            setProgressModal(false);
            setMoveById(false);
          },
        },
      ]);
    }
    if (index == 2) {
      Alert.alert('Update Status', `${key}`, [
        {
          text: 'ok',
          onPress: () => {
            ActionHandler(key);
            setProgressModal(false);
            setMoveById(false);
          },
        },
      ]);
    }
    if (index == 3) {
      Alert.alert('Update Status', `${key}`, [
        {
          text: 'ok',
          onPress: () => {
            ActionHandler(key);
            setProgressModal(false);
            setMoveById(false);
          },
        },
      ]);
    }
    if (index == 4) {
      Alert.alert('Update Status', `${key}`, [
        {
          text: 'ok',
          onPress: () => {
            ActionHandler(key);
            setProgressModal(false);
            setMoveById(false);
          },
        },
      ]);
    }
  };

  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => setMoveById(!moveById)}>
        <AntDesign
          name="close"
          size={25}
          color={COLORS.light}
          style={{textAlign: 'right'}}
        />
      </TouchableOpacity>
      {/* <Text>{actionData.id}</Text> */}
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => selectActionHandler(index, item.action)}
              >
                {actionData.status != item.action ? (
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: 20,
                    }}
                  >
                    {item?.action.replace('_', '  ')}
                  </Text>
                ) : null}
              </TouchableOpacity>
            </>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={progressModal}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setProgressModal(!progressModal);
        }}
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.light20,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.support1,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
              height: 250,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <Text
                style={{fontWeight: '600', paddingHorizontal: 10, marginTop: 5}}
              >
                {actionData.complete_percentage} %
              </Text>
              <TouchableOpacity onPress={() => setProgressModal(false)}>
                <AntDesign
                  name="close"
                  size={25}
                  color={COLORS.light}
                  style={{
                    textAlign: 'right',
                    backgroundColor: 'red',
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>
            </View>

            <FormInput
              containerStyle={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                marginTop: 10,
              }}
              placeholder="Percent"
              value={state.percent}
              onChange={m => onchangeState('percent', m)}
            />
            <TextButton
              label={'Submit'}
              contentContainerStyle={{
                marginTop: 10,
                borderRadius: SIZES.radius,
                height: 50,
              }}
              labelStyle={{
                color: COLORS.light,
              }}
              onPress={() => {
                ActionHandler('in_progress');
                setProgressModal(false);
                setMoveById(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActionById;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 54,
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
