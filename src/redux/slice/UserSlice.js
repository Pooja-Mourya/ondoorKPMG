import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginFun: (state, action) => {
      console.log('sliceState', state.user.user);
      state.user = action.payload;
    },
    userLogoutFun: state => {
      //   console.log('logout state', state);
      //   (state.email = null),
      //     (state.access_token = null),
      //     (state.isLoggedIn = null);
      //   AsyncStorage.removeItem('@user');
    },
  },
});

// Action creators are generated for each case reducer function
export const {userLoginFun, userLogoutFun} = UserSlice.actions;

export default UserSlice.reducer;
