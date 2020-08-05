import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storeInitialState from "../store/initial-state";
export const initialState = storeInitialState.user;

const { actions, reducer } = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(_state, _action: PayloadAction<{ params: object }>) {},
    loginSuccess(state, _: PayloadAction<void>) {
      return state;
    },
    loginFailure() {},
    logout() {
      return initialState;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = actions;

export default reducer;
