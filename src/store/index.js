import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import authReducer from './auth';
import homepageReducer from './homepage';
import { history } from 'helpers';

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const rootReducer = combineReducers({
  router: connectRouter(history),
  authReducer,
  homepageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
