import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from '~/reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/rootSaga";



export default function configureStore(initialState) {

  const sageMiddleware = createSagaMiddleware();
  const store =  createStore(
      rootReducer,
      initialState,
      // applyMiddleware(thunk, logger)
      applyMiddleware(sageMiddleware, thunk, logger)
  );
  sageMiddleware.run(rootSaga);

  return store;
}
