import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';

import { GlobalStyles } from '../globalStyles';
import { Navigation } from '_components';
import { Home, SeatSelection, PerformerOrVenue } from '_pages';

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
    <Navigation />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/performer/:performerId">
        <DynamicPerformer />
      </Route>
      <Route path="/venue/:venueId">
        <DynamicVenue />
      </Route>
      <Route exact path="/event/:eventId" component={SeatSelection} />
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default Routes;
