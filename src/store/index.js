import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import authReducer from './auth';
import { history } from 'helpers';

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const rootReducer = combineReducers({
  router: connectRouter(history),
  authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
