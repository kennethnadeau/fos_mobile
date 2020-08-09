import { combineReducers } from "redux";

import flagsReducer from "../slices/flagsSlice";
import navigationReducer from "../slices/navigationSlice";
import toastReducer from "../slices/toastSlice";
import userReducer from "../slices/userSlice";

import otpReducer from "./otpReducer";

const rootReducer = combineReducers({
  flags: flagsReducer,
  navigation: navigationReducer,
  otp: otpReducer,
  toast: toastReducer,
  user: userReducer,
});

export default rootReducer;
