import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AllOrders } from './components/allOrders';
import { OrderDetails } from './components/orderDetails';
import { Navigation } from '_components';
import { authService } from '_services';

export const Orders = () => {
  const user = authService.getAuthFromStorage()?.user;
  return user ? (
    <>
      <Navigation page="user" />
      <Switch>
        <Route exact path="/orders" component={AllOrders} />
        <Route exact path="/orders/:orderId" component={OrderDetails} />
        <Redirect to="/orders" />
      </Switch>
    </>
  ) : (
    <>
      <Navigation page="home" />
      <Switch>
        <Route exact path="/orders/:orderId" component={OrderDetails} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
