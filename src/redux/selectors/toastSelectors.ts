import { RootState } from "redux/store/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectToast = (state: RootState) => state.toast;

export const selectToastMessage = createSelector(
  selectToast,
  ({ message }) => message,
);
