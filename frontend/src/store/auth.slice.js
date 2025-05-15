import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_PERSISTENT_STATE = 'userData';

const initialState = {
  token: loadState(JWT_PERSISTENT_STATE)?.token ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken: (state, { payload: { token } }) => {
      state.token = token;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
