import React from 'react';
import PropTypes from 'prop-types';

import { CheckoutNavigation } from '_components';

export const CheckoutLayout = ({ children }) => (
  <>
    <CheckoutNavigation />
    {children}
  </>
);

CheckoutLayout.propTypes = {
  children: PropTypes.node,
};
