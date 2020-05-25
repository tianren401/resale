import React from 'react';
import PropTypes from 'prop-types';

import { EventNavigation } from '_components';

export const EventLayout = ({ children }) => (
  <>
    <EventNavigation />
    {children}
  </>
);

EventLayout.propTypes = {
  children: PropTypes.node,
};
