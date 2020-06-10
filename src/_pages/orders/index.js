import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { OrdersLayout } from './components/ordersLayout';
import { AllOrders } from './components/allOrders';
import { Navigation } from '_components';

export const Orders = () => {
  return (
    <>
      <Navigation />
      <OrdersLayout>
        <Switch>
          <Route path="/orders/upcoming" component={AllOrders} />
          <Route path="/orders/past" component={AllOrders} />
          <Redirect to="/orders/upcoming" />
        </Switch>
      </OrdersLayout>
    </>
  );
};
