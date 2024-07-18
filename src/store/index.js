import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './userSclice';

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
