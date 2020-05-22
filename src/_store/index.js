import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import authReducer from './auth';
import searchReducer from './search';
import eventsReducer from './events';
import performerReducer from './performer';
import venueReducer from './venue';
import homeReducer from './home';
import seaticsReducer from './seatics';
import ticketGroupListReducer from './ticketGroupList';
import checkoutTicketReducer from './checkoutTicket';
import { history } from '_helpers';

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const rootReducer = combineReducers({
  router: connectRouter(history),
  authReducer,
  searchReducer,
  eventsReducer,
  performerReducer,
  venueReducer,
  homeReducer,
  seaticsReducer,
  ticketGroupListReducer,
  checkoutTicketReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
