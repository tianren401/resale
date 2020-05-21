import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import headerImage from '_images/mocks/headerImage.jpg';
import { deviceSize } from '_constants';

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50vh;
  background-color: #a9a9a9;
  background-image: url(${headerImage});
  background-size: cover;
  background-position: center;
  background-position-x: center;
  background-position-y: center;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 100px 100px 75px 200px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 30px 10px;
  }
`;

const Performer = styled.div`
  font-weight: bold;
  font-size: 38px;
  line-height: 46px;
  color: white;
  padding: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
    width: 100%;
    text-align: left;
  }
`;

const Subtitle = styled.div`
  color: white;
  font-size: 14px;
  padding: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
    line-height: 22px;
  }
`;

const Address = styled.div`
  color: white;
  font-size: 16px;
  padding: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
    line-height: 24px;
  }
`;

export const Header = ({ events }) => {
  return (
    <StyledHeader>
      <EventInfo>
        <Performer>
          {/* TODO: Populate text based on performer info instead of event info */}
          {events?.length
            ? events[0].performers[0].name
            : 'No upcoming events found'}
        </Performer>
        <Address>{events?.length && events[0].venue.street}</Address>
        <Subtitle>
          Millions of Customers Served • 100% Guaranteed • Low Fees
        </Subtitle>
      </EventInfo>
    </StyledHeader>
  );
};

Header.propTypes = {
  events: PropTypes.array,
  performerId: PropTypes.number,
  venueId: PropTypes.number,
};
