import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCountryCode = createAction("otp/countrycode", (payload) => ({
  payload,
}));
export const setEmailAddress = createAction("opt/setemail", (payload) => ({
  payload,
}));
export const setMobileNumber = createAction("otp/setmobile", (payload) => ({
  payload,
}));
export const setOtpCode = createAction("opt/setcode", (payload) => ({
  payload,
}));
export const setOtpCodeVerificationStatus = createAction(
  "opt/setverificationstatus",
  (payload) => ({
    payload,
  }),
);
export const setRegistrationUuid = createAction("opt/setuuid", (payload) => ({
  payload,
}));

type OtpReducerState = {
  countryCode: string;
  emailAddress: string;
  mobileNumber: string;
  otpCode: string;
  registrationUuid: string;
  otpCodeVerificationStatus: "unverified" | "verified";
};

const initialState: OtpReducerState = {
  countryCode: "+1",
  emailAddress: "",
  mobileNumber: "",
  otpCode: "",
  registrationUuid: "",
  otpCodeVerificationStatus: "unverified",
};

const otpReducer = createReducer(initialState, {
  [setCountryCode.type]: (state: any, action: any) => ({
    ...state,
    countryCode: action.payload,
  }),
  [setEmailAddress.type]: (state, action) => ({
    ...state,
    emailAddress: action.payload,
  }),
  [setMobileNumber.type]: (state, action) => ({
    ...state,
    mobileNumber: action.payload,
  }),
  [setOtpCode.type]: (state, action) => ({
    ...state,
    otpCode: action.payload,
  }),
  [setOtpCodeVerificationStatus.type]: (state, action) => ({
    ...state,
    otpCodeVerificationStatus: action.payload,
  }),
  [setRegistrationUuid.type]: (state, action) => ({
    ...state,
    registrationUuid: action.payload,
  }),
});

export default otpReducer;
