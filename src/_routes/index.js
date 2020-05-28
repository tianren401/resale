import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';

import { GlobalStyles } from '../globalStyles';
import {
  Home,
  SeatSelection,
  Checkout,
  Results,
  Performer,
  Venue,
} from '_pages';

import { ScrollToTop } from '_components';

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

const Routes = () => (
  <Router>
    <ScrollToTop />
    <GlobalStyles />
    <Switch>
      <Route exact path="/home" component={Home} />
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
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default Routes;
