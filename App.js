import React from 'react';
import MyStack from './src/navigation/MyStack';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {Root} from 'popup-ui';
import {ThemeProvider} from './src/screen/theme/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Root>
        <Provider store={store}>
          <MyStack />
        </Provider>
      </Root>
    </ThemeProvider>
  );
};

export default App;

// import React, {useState} from 'react';
// import {TextInput, Button, View, Text} from 'react-native';
// const string = 'abcdefghijklmnopqrstuvwxyz';
// const numeric = '0123456789';
// const punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
// export default function App() {
//   const [length, setLength] = useState(10);
//   const [password, setPassword] = useState('');
//   const generatePassword = () => {
//     const formValid = +length > 0;
//     if (!formValid) {
//       return;
//     }
//     let character = '';
//     let password = '';
//     while (password.length < length) {
//       const entity1 = Math.ceil(string.length * Math.random() * Math.random());
//       const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
//       const entity3 = Math.ceil(
//         punctuation.length * Math.random() * Math.random(),
//       );
//       let hold = string.charAt(entity1);
//       hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
//       character += hold;
//       character += numeric.charAt(entity2);
//       character += punctuation.charAt(entity3);
//       password = character;
//     }
//     password = password
//       .split('')
//       .sort(() => {
//         return 0.5 - Math.random();
//       })
//       .join('');
//     setPassword(password.substr(0, length));
//   };
//   return (
//     <View className="App">
//       <View>
//         <Text>length</Text>
//         <TextInput value={length} onChange={e => setLength(e)} />
//       </View>
//       <Button title="submit" onPress={() => generatePassword()} />

//       <Text>{password}</Text>
//     </View>
//   );
// }
