import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Checkout } from '../components';
import { OrderInfo } from './orderInfo';
import { OrderInfoMobile } from './orderInfoMobile';
import { setCheckoutState } from '_store/checkout';
import { isMobileDevice } from '_helpers';

export const PlaceOrder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutState(2));
  }, [dispatch]);

  return (
    <Checkout>{isMobileDevice ? <OrderInfoMobile /> : <OrderInfo />}</Checkout>
  );
};
