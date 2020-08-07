import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "toast",
  initialState: {
    message: "",
  },
  reducers: {
    setToastMessage(state, { payload }: PayloadAction<string>) {
      state.message = payload;
      return state;
    },
  },
});

export const { setToastMessage } = actions;

export default reducer;
