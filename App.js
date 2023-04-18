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

// import React, {useRef} from 'react';
// import {View, TextInput} from 'react-native';

// const App = () => {
//   const inputRef1 = useRef(null);
//   const inputRef2 = useRef(null);

//   return (
//     <View>
//   <TextInput
//     ref={inputRef1}
//     onSubmitEditing={() => inputRef2.current.focus()}
//   />
//   <TextInput ref={inputRef2} />
//     </View>
//   );
// };

// export default App;
