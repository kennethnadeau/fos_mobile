import { combineReducers } from "redux";

import otpReducer from "../slices/otpSlice";
import userReducer from "../slices/userSlice";
import navigationReducer from "../slices/navigationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  otp: otpReducer,
});

export default rootReducer;
