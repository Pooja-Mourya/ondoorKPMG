import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/layout/Header';

const ViewActionItem = props => {
  const {navigation} = props;
  const items = props.route.params;

  //   console.log('items', items);
  return (
    <View>
      <Header
        textHeader={'Action Item Details'}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <Text>ViewActionItem</Text>
      <Text>{items.comment}</Text>
      <Text>{items.complete_percentage}</Text>
      <Text>{items.date_opened}</Text>
    </View>
  );
};

export default ViewActionItem;

const styles = StyleSheet.create({});
