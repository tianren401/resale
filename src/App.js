import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from './globalStyles';
import { Navigation } from 'components';
import { Home } from 'pages/home';
import { Login } from 'pages/login';

const MainContent = styled.div`
  padding: 25px;
`;

export const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Navigation />
    <MainContent>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </MainContent>
  </BrowserRouter>
);
