import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CheckoutLayout } from '_components';
import { FAQGroup } from './components';
import { DeliveryInfo } from './deliveryInfo';
import { BillingPage } from './billingPage';
import { PlaceOrder } from './placeOrder';
import { Confirmation } from './confirmation';
import { Footer } from '../home/footer';

export const Checkout = () => {
  const { checkoutStage } = useSelector((state) => state.checkoutReducer);

  return (
    <div>
      <CheckoutLayout />
      <Switch>
        <Route path="/checkout/delivery" component={DeliveryInfo} />
        <Route path="/checkout/billing" component={BillingPage} />
        <Route path="/checkout/placeorder" component={PlaceOrder} />
        <Route path="/checkout/confirmation" component={Confirmation} />
        <Redirect to="/checkout/delivery" />
      </Switch>
      {checkoutStage === 3 ? <Footer /> : <FAQGroup />}
    </div>
  );
};
