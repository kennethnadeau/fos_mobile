import { RootState } from "redux/store/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectOtp = (state: RootState) => state.otp;

export const selectOtpState = createSelector(selectOtp, (otp) => otp);
