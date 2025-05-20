import { configureStore } from '@reduxjs/toolkit';
import authSlice, { JWT_PERSISTENT_STATE } from './auth.slice';
import { saveState } from './storage';

const store = configureStore({
  reducer: {
    auth: authSlice,
  }
});

store.subscribe(() => {
  saveState({
    token: store.getState().auth.token,
    username: store.getState().auth.username,
    password: store.getState().auth.password,
    channels: store.getState().auth.channels,
    messages: store.getState().auth.messages,
  }, JWT_PERSISTENT_STATE);
});

export default store;