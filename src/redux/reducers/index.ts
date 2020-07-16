import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';

import userReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
});

export default rootReducer;
