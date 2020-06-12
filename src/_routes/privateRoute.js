import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '_services';

export const PrivateRoute = (props) => {
  const user = authService.getAuthFromStorage()?.user;
  if (user) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};
