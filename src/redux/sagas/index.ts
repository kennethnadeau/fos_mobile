import {all} from 'redux-saga/effects';
import {watchUserRequests} from './user.sagas';

function* rootSaga() {
  yield all([watchUserRequests()]);
}

export default rootSaga;
