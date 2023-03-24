import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Welcome,
  Walkthrough,
  AuthMain,
  MyTab,
  Forgot,
  AddMeeting,
  Resetpassword,
  ViewMeeting,
  AddNotes,
  ViewNotes,
  ActionList,
  AddActionItem,
  ViewActionItem,
  AddRole,
  ViewRoles,
  AddUser,
  ViewUser,
  ActionItemAction,
  ViewPermission,
  AddPermission,
} from '../screen/index';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Welcome'}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Walkthrough" component={Walkthrough} />
        <Stack.Screen name="AuthMain" component={AuthMain} />
        <Stack.Screen name="MyTab" component={MyTab} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="AddMeeting" component={AddMeeting} />
        <Stack.Screen name="Resetpassword" component={Resetpassword} />
        <Stack.Screen name="ViewMeeting" component={ViewMeeting} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        <Stack.Screen name="ViewNotes" component={ViewNotes} />
        <Stack.Screen name="ActionList" component={ActionList} />
        <Stack.Screen name="AddActionItem" component={AddActionItem} />
        <Stack.Screen name="ViewActionItem" component={ViewActionItem} />
        <Stack.Screen name="AddRole" component={AddRole} />
        <Stack.Screen name="ViewRoles" component={ViewRoles} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="ViewUser" component={ViewUser} />
        <Stack.Screen name="ActionItemAction" component={ActionItemAction} />
        <Stack.Screen name="ViewPermission" component={ViewPermission} />
        <Stack.Screen name="AddPermission" component={AddPermission} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
