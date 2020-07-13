import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "@react-native-community/async-storage";
// import { eventBusMiddleware } from '../middlewares';
import { rootSaga } from "../sagas";

const persistConfig = {
  key: "flats_or_spikes",
  storage,
};

const middlewares: Array<any> = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(logger);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState: any) {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  // global.store = store;
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}
