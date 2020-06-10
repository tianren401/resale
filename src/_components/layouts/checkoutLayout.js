import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from '_components';

export const CheckoutLayout = ({ children }) => (
  <>
    <Navigation page="checkout" />
    {children}
  </>
);

CheckoutLayout.propTypes = {
  children: PropTypes.node,
};
