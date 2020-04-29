import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from '../globalStyles';
import { Navigation, HeroCarousel } from 'components';
import { Home } from 'pages';
// import { EventCarousel } from 'components/eventCarousel';

const MainContent = styled.div`
  padding: 25px;
`;

const Routes = () => (
  <Router>
    <GlobalStyles />
    {/* <MainContent> */}
    <Navigation />
      <HeroCarousel />
      {/* <EventCarousel /> */}
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    {/* </MainContent> */}
  </Router>
);

export default Routes;
