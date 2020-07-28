import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';

import userReducer from '../slices/userSlice';
import navigationReducer from '../slices/navigationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  form: formReducer,
});

export default rootReducer;
