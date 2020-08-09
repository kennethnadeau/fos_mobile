import { RootState } from "redux/store/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectFlags = (state: RootState) => state.flags;

export const selectResendAlert = createSelector(
  selectFlags,
  ({ isResendAlertVisible }) => isResendAlertVisible,
);

export const selectSpinnerVisible = createSelector(
  selectFlags,
  ({ isSpinnerVisible }) => isSpinnerVisible,
);

export const selectInvalidCodeAlert = createSelector(
  selectFlags,
  ({ isInvalidCodeAlertVisible }) => isInvalidCodeAlertVisible,
);
