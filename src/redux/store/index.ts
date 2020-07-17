import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import storage from '@react-native-community/async-storage';
import rootSaga from '../sagas';

const persistConfig = {
  key: 'flats_or_spikes',
  storage,
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function () {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}
