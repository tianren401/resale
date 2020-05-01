import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from '../globalStyles';
import { Navigation } from 'components';
import { Home } from 'containers';

const MainContent = styled.div`
  //Todo:
`;

const Routes = () => (
  <Router>
    <GlobalStyles />
    <Navigation />
    <MainContent>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </MainContent>
  </Router>
);

export default Routes;
