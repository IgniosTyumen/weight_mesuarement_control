import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from '~/reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/rootSaga";


function configureStore(initialState) {

  const sageMiddleware = createSagaMiddleware();
  const store =  createStore(
      rootReducer,
      initialState,
      // applyMiddleware(thunk, logger)
      // applyMiddleware(sageMiddleware, thunk, logger)
      applyMiddleware(sageMiddleware, thunk)
  );
  sageMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();
