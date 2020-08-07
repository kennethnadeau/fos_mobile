import { combineReducers } from "redux";

import userReducer from "../slices/userSlice";
import navigationReducer from "../slices/navigationSlice";

import otpReducer from "./otpReducer";

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  otp: otpReducer,
});

export default rootReducer;
