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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
