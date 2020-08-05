import { takeEvery } from "redux-saga/effects";
import { login } from "../slices/userSlice";

export function* watchUserRequests() {
  yield takeEvery(login.type, requestLogin);
}

function* requestLogin() {
  yield null;
}
