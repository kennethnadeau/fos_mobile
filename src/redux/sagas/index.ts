import { all } from "redux-saga/effects";
import { watchUserRequests } from "./user.sagas";

export default function* rootSaga() {
  yield all([watchUserRequests()]);
}
