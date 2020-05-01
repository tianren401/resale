import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from '../globalStyles';
import { Navigation } from '_components';
import { Home } from '_pages';

const MainContent = styled.div`
  //Todo:
`;

const Routes = () => (
  <Router>
    <GlobalStyles />
    <Navigation />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
  </Router>
);

export default Routes;
