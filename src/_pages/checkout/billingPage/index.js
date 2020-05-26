import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Checkout } from '../components';
import { PaymentField } from './paymentField';
import { setCheckoutState } from '_store/checkout';

export const BillingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutState(1));
  }, [dispatch]);

  return (
    <Checkout>
      <PaymentField />
    </Checkout>
  );
};
