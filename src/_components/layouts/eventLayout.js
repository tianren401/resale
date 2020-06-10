import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from '_components';

export const EventLayout = ({ children }) => (
  <>
    <Navigation page="event" />
    {children}
  </>
);

EventLayout.propTypes = {
  children: PropTypes.node,
};
