import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  countryCode: "+1",
  mobileNumber: "",
  otpCode: "",
  registrationUuid: "",
  otpCodeVerificationStatus: "",
};

const { actions, reducer } = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setMobileNumber(state, { payload }: PayloadAction<string>) {
      state.mobileNumber = payload;
    },
    setCountryCode(state, { payload }: PayloadAction<string>) {
      state.countryCode = payload;
    },
    setOtpCode(state, { payload }: PayloadAction<string>) {
      state.otpCode = payload;
    },
    setRegistrationUuid(state, { payload }: PayloadAction<string>) {
      state.registrationUuid = payload;
    },
    setOtpCodeVerificationStatus(state, { payload }: PayloadAction<string>) {
      state.otpCodeVerificationStatus = payload;
    },
  },
});

export const {
  setCountryCode,
  setMobileNumber,
  setOtpCode,
  setOtpCodeVerificationStatus,
  setRegistrationUuid,
} = actions;

export default reducer;
