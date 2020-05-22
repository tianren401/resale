import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Checkout } from '../components';
import { InfoContent } from './infoContent';
import {
  getClientToken,
  getDeliveryInfo,
  setCheckoutState,
} from '_store/checkout';

export const DeliveryInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckoutState(0));
  }, [dispatch]);

  const handleSubmit = (values) => {
    dispatch(getDeliveryInfo(values));
    dispatch(
      getClientToken({
        success: () => {
          history.push('/checkout/billing');
        },
      })
    );
  };

  return (
    <Checkout>
      <InfoContent handleSubmit={handleSubmit} />
    </Checkout>
  );
};
