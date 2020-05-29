import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { navigationHeight } from '_constants';

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  height: ${navigationHeight}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Event = styled.div`
  font-weight: bold;
  color: white;
`;

const Subtitle = styled.div`
  display: flex;
  color: #f0f0f5;
`;

export const Header = ({ event }) => {
  return (
    <StyledHeader>
      <Event>{event?.eventName}</Event>
      <Subtitle>
        {`${event?.eventDate.toDateString()} • ${event?.city},`}
        {` ${event?.stateProvince} • ${event?.venueName}`}
      </Subtitle>
    </StyledHeader>
  );
};

Header.propTypes = {
  event: PropTypes.objectOf(Object),
};
