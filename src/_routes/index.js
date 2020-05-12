import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { GlobalStyles } from '../globalStyles';
import { Navigation } from '_components';
import { Home, Performer } from '_pages';

const Routes = () => (
  <Router>
    <GlobalStyles />
    <Navigation />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/performer" component={Performer} />
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default Routes;
