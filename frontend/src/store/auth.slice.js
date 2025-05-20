import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_PERSISTENT_STATE = 'userData';

const initialState = {
  token: loadState(JWT_PERSISTENT_STATE)?.token ?? null,
  username: loadState(JWT_PERSISTENT_STATE)?.username ?? null,
  password: loadState(JWT_PERSISTENT_STATE)?.password ?? null,
  channels: loadState(JWT_PERSISTENT_STATE)?.channels ?? [],
  messages: loadState(JWT_PERSISTENT_STATE)?.messages ?? [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token, values } }) => {
      state.token = token;
      state.username = values.username;
      state.password = values.password;
    },
    setChannels: (state, { payload : { channels }}) => {
      state.channels = channels;
    },
    setMessages: (state, { payload : { messages }}) => {
      state.messages = [ ...messages ];
    },
    addMessages: (state, {payload : message }) => {
      state.messages = [ ...state.messages, message ];
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
