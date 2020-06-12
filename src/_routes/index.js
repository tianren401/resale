import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  useParams,
  Route,
} from 'react-router-dom';

import { GlobalStyles } from '../globalStyles';
import {
  Home,
  SeatSelection,
  Checkout,
  Results,
  Performer,
  Venue,
  UserProfile,
  Orders,
} from '_pages';
import { ScrollToTop } from '_components';
import { ViewportProvider } from '_hooks';
import { authService } from '_services';
import { getUserInfoAction } from '_store/auth';
import { PrivateRoute } from './privateRoute';

const DynamicPerformer = () => {
  const { performerId } = useParams();
  return <Performer performerId={parseInt(performerId)} />;
};

const DynamicVenue = () => {
  const { venueId } = useParams();
  return <Venue venueId={parseInt(venueId)} />;
};

const DynamicEvent = () => {
  const { eventId } = useParams();
  return <SeatSelection eventId={parseInt(eventId)} />;
};

const Routes = () => {
  const authState = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authService.getAuthFromStorage()?.token && !authState.user) {
      dispatch(getUserInfoAction());
    }
  }, [authState.user, dispatch]);

  return (
    <ViewportProvider>
      <Router>
        <ScrollToTop />
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/performer/:performerId">
            <DynamicPerformer />
          </Route>
          <Route path="/venue/:venueId">
            <DynamicVenue />
          </Route>
          <Route exact path="/event/:eventId">
            <DynamicEvent />
          </Route>
          <Route path="/checkout" component={Checkout} />
          <Route path="/results" component={Results} />
          <PrivateRoute path="/user" component={UserProfile} />
          <Route path="/orders" component={Orders} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ViewportProvider>
  );
};

export default Routes;
