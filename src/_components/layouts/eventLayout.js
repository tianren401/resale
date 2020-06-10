import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Navigation } from '_components';

const EventLayoutContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export const EventLayout = ({ children }) => (
  <EventLayoutContainer>
    <Navigation page="event" />
    {children}
  </EventLayoutContainer>
);

EventLayout.propTypes = {
  children: PropTypes.node,
};
