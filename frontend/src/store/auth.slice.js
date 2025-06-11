import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: JSON.parse(localStorage.getItem('user'))?.token ?? null,
  username: JSON.parse(localStorage.getItem('user'))?.username ?? null,
  channels: [],
  messages: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token, username } }) => {
      state.token = token;
      state.username = username;
    },
    getChannels: (state, { payload }) => {
      state.channels = payload;
    },
    getMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload : message }) => {
      state.messages = [ ...state.messages, message ];
    },
    addChannel: (state, { payload: channel }) => {
      state.channels = [ ...state.channels, channel ];
    },
    removeChannel: (state, { payload: channel }) => {
      state.channels = state.channels.filter(({ id }) => id !== channel.id);
      state.messages = state.messages.filter(({ channelId }) => channelId !== channel.id);
    },
    renameChannel: (state, { payload }) => {
      const changedState = state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return {...channel, name: payload.name };
        }
        return channel;
      });
      state.channels = [...changedState];
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
