import { createReducer } from "reduxsauce";
import { UserTypes } from "../actions";
import storeInitialState from "../store/initial-state";
export const INITIAL_STATE = storeInitialState.user;

const logout = () => INITIAL_STATE;

const schoolLoginSuccess = (state: any) => ({
  ...state,
});

export const HANDLERS = {
  [UserTypes.LOGIN_SUCCESS]: schoolLoginSuccess,
  [UserTypes.LOGOUT]: logout,
};

export default createReducer(INITIAL_STATE, HANDLERS);
