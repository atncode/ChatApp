import { createSlice } from "@reduxjs/toolkit";
import leo from 'leo-profanity';

leo.add(leo.getDictionary('ru'));

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
      const newMessage = {...message, body: leo.clean(message.body)};
      state.messages = [ ...state.messages, newMessage ];
    },
    addChannel: (state, { payload: channel }) => {
      const newChannel = { ...channel, name: leo.clean(channel.name) };
      state.channels = [ ...state.channels, newChannel ];
    },
    removeChannel: (state, { payload: channel }) => {
      state.channels = state.channels.filter(({ id }) => id !== channel.id);
      state.messages = state.messages.filter(({ channelId }) => channelId !== channel.id);
    },
    renameChannel: (state, { payload }) => {
      const changedState = state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return {...channel, name: leo.clean(payload.name) };
        }
        return channel;
      });
      state.channels = [...changedState];
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
