import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginFun: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {userLoginFun} = UserSlice.actions;

export default UserSlice.reducer;
