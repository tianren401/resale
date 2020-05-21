import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  flex-direction: column;
  align-items: center;
  background-color: #c4c4c4;
  justify-content: center;
`;

const Event = styled.div`
  position: relative;
  top: 10%;
  font-weight: bold;
  color: white;
  padding: 10px;
`;

const Subtitle = styled.div`
  display: flex;
  color: white;
`;

export const Header = ({ event }) => {
  return (
    <StyledHeader>
      <Event>{event?.eventName}</Event>
      <Subtitle>
        {`${event?.eventDate.toDateString()} • ${event?.city}`}
        {` ${event?.stateProvince} • ${event?.venueName}`}
      </Subtitle>
    </StyledHeader>
  );
};

Header.propTypes = {
  event: PropTypes.objectOf(Object),
};
