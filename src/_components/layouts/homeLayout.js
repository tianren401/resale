import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from '_components';

export const HomeLayout = ({ children }) => (
  <>
    <Navigation page="home" />
    {children}
  </>
);

HomeLayout.propTypes = {
  children: PropTypes.node,
};
