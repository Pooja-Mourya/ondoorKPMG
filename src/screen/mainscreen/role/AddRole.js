import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import ApiMethod from '../../../Services/APIService';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import TextButton from '../../../components/TextButton';

const AddRole = props => {
  const {navigation} = props;

  const editRole = props.route.params;

  const token = useSelector(state => state?.user?.user?.access_token);

  const [selected, setSelected] = useState([]);
  const [se_name, setSe_name] = useState([]);
  const [listState, setListState] = useState();
  const handleRoles = async () => {
    const url = constants.endPoint.roles;
    const params = {};
    try {
      const result = await ApiMethod.postData(url, params, token);
      console.log('result', result?.data?.data, 'url', url);
      setListState(result?.data?.data);
      return;
    } catch (error) {
      console.log('error', error);
    }
  };

  const SubmitRole = async () => {
    let url = constants.endPoint.role;
    let params = {
      se_name: se_name.name,
      permissions: [selected],
    };

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
      se_name: se_name.name,
      permissions: [selected],
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

  useEffect(() => {
    handleRoles();
  }, []);

  useEffect(() => {
    if (editRole) {
      setSelected(editRole.selected);
      setSe_name(editRole.se_name);
    }
  }, []);

  console.log('listState');
  return (
    <>
      <Header textHeader={editRole ? 'EDIT ROLE' : 'ADD ROLE'} />
      <ScrollView
        style={{
          margin: 10,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.secondary,
        }}
      >
        <FlatList
          data={listState}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            console.log('listState', item.permissions[0].group_name);

            // if(item.name === 'Admin' || item.name === 'User' || item.name === 'manager' )
            return (
              <>
                <Text>{item.name}</Text>
                {/* <Text>{item.permissions[0].name.length}</Text>
                <Text>{item.permissions.length}</Text> */}

                <MultiSelect
                  style={[styles.dropdown, {marginVertical: 10}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={item.permissions}
                  labelField="name"
                  valueField="id"
                  placeholder={'select item'}
                  searchPlaceholder="Search..."
                  value={selected}
                  onChange={item => {
                    setSelected(item);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                  selectedStyle={styles.selectedStyle}
                />
              </>
            );
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listState}
          search
          maxHeight={300}
          labelField="se_name"
          valueField="id"
          placeholder="Select name"
          searchPlaceholder="Search..."
          value={se_name}
          onChange={item => {
            setSe_name(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
        <TextButton
          label={'ADD ROLE'}
          contentContainerStyle={{
            ...FONTS.base,
            padding: 5,
            borderRadius: SIZES.radius,
            marginBottom: 50,
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
