import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { stateTransformer } from 'redux-seamless-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from '../sagas/rootSaga';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  stateTransformer,
  collapsed: true
});

const configureStoreProduction = (initialState) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const configureStoreDev = (initialState) => {
  const middlewares = [
    sagaMiddleware,
    loggerMiddleware,
    routerMiddleware(history)
  ];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

const configureStore = process.env.NODE_ENV === 'development'
  ? configureStoreDev
  : configureStoreProduction;

export default configureStore;
