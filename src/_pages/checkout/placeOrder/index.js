import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Checkout } from '../components';
import { OrderInfo } from './orderInfo';
import { setCheckoutState } from '_store/checkout';

export const PlaceOrder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutState(2));
  }, [dispatch]);

  return (
    <Checkout>
      <OrderInfo />
    </Checkout>
  );
};
