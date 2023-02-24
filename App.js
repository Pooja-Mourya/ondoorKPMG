import React from 'react';
import MyStack from './src/navigation/MyStack';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

export default App;

// import React, {useState} from 'react';

// import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function App() {
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [text, setText] = useState('empty');

//   const onChange = (event, selectedData) => {
//     const currentDate = selectedData || date;
//     setShow(false);
//     setDate(currentDate);

//     let tempDate = new Date(currentDate);
//     let fDate =
//       tempDate.getDate() +
//       '/' +
//       (tempDate.getMonth() + 1) +
//       '/' +
//       tempDate.getFullYear();
//     let fTime =
//       'Hours:' + tempDate.getHours() + '| Minutes:' + tempDate.getMinutes();
//     setText(fDate + '\n' + fTime);
//     console.log('first', fDate + '\n' + fTime);
//   };

//   const showMode = currentMode => {
//     setShow(true);
//     setMode(currentMode);
//   };
//   return (
//     <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
//       <Button title="Datepiker" onPress={() => showMode('date')} />
//       <Text>jffhj</Text>
//       <Button title="timepiker" onPress={() => showMode('time')} />

//       <Text>{text}</Text>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           display={'default'}
//           is24Hour={true}
//           onChange={() => onChange()}
//         />
//       )}
//     </View>
//   );
// }

// const styleSheet = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     padding: 6,
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },

//   text: {
//     fontSize: 25,
//     color: 'red',
//     padding: 3,
//     marginBottom: 10,
//     textAlign: 'center',
//   },

//   // Style for iOS ONLY...
//   datePicker: {
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: 320,
//     height: 260,
//     display: 'flex',
//   },
// });
