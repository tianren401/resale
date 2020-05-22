import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';

import { GlobalStyles } from '../globalStyles';
import { Home, SeatSelection, PerformerOrVenue, Checkout } from '_pages';
import { DateRangePicker } from '_components/dateRangePicker/dateRangePicker';

const DynamicPerformer = () => {
  const { performerId } = useParams();
  return <PerformerOrVenue performerId={parseInt(performerId)} />;
};

const DynamicVenue = () => {
  const { venueId } = useParams();
  return <PerformerOrVenue venueId={parseInt(venueId)} />;
};

const Routes = () => (
  <Router>
    <GlobalStyles />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/daypicker" component={DateRangePicker} />
      <Route path="/performer/:performerId">
        <DynamicPerformer />
      </Route>
      <Route path="/venue/:venueId">
        <DynamicVenue />
      </Route>
      <Route exact path="/event/:eventId" component={SeatSelection} />
      <Route path="/checkout" component={Checkout} />
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default Routes;
