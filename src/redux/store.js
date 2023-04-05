import {configureStore} from '@reduxjs/toolkit';
import LoginUserReducer from './slice/UserSlice';

export const store = configureStore({
  reducer: {
    user: LoginUserReducer,
  },
});
