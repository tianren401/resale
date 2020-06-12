import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        getDeliveryInfo({
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          phoneNumber: user.phone,
        })
      );
      dispatch(
        getClientToken({
          success: () => {
            history.push('/checkout/billing');
          },
        })
      );
    }
    dispatch(setCheckoutState(0));
  }, [dispatch, history, user]);

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
