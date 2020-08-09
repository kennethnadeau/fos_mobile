import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "flags",
  initialState: {
    isInvalidCodeAlertVisible: false,
    isSpinnerVisible: false,
    isResendAlertVisible: false,
  },
  reducers: {
    setShowInvalidCodeAlert(state, { payload }: PayloadAction<boolean>) {
      state.isInvalidCodeAlertVisible = payload;
      return state;
    },
    setShowSpinner(state, { payload }: PayloadAction<boolean>) {
      state.isSpinnerVisible = payload;
      return state;
    },
    setShowResendAlert(state, { payload }: PayloadAction<boolean>) {
      state.isResendAlertVisible = payload;
      return state;
    },
  },
});

export const {
  setShowInvalidCodeAlert,
  setShowSpinner,
  setShowResendAlert,
} = actions;

export default reducer;
