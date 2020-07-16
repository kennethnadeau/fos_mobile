import {takeEvery} from 'redux-saga/effects';
import {login} from '../slices/userSlice';

function* requestLogin() {
  yield null;
}

export function* watchUserRequests() {
  yield takeEvery(login.type, requestLogin);
}
