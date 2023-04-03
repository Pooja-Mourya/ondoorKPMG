import {configureStore} from '@reduxjs/toolkit';
import LoginUserReducer from './slice/UserSlice';
import persistReducer from 'redux-persist/es/persistReducer';

export const store = configureStore({
  reducer: {
    user: LoginUserReducer,
  },
});
