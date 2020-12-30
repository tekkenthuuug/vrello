import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const envMiddlewares = [logger];
  middlewares.push(...envMiddlewares);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
