import React from 'react';
import PropTypes from 'prop-types';

import { HomeNavigation } from '_components';

export const HomeLayout = ({ children }) => (
  <>
    <HomeNavigation />
    {children}
  </>
);

HomeLayout.propTypes = {
  children: PropTypes.node,
};
