import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { deviceSize } from '_constants';
import { isMobileDevice } from '_helpers';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TimeColumn = styled(FlexColumn)`
  width: 20%;
  align-self: flex-start;
  text-align: left;
`;

const InfoColumn = styled(FlexColumn)`
  width: 50%;
  overflow: hidden;
  text-align: left;
`;

const MainInfo = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #121212;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ cardClicked }) => (cardClicked ? '#6726f1' : 'black')};

  @media (max-width: ${deviceSize.tablet}px) {
    text-overflow: initial;
    white-space: initial;
    overflow: initial;
  }
`;

const Detail = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #606060;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

const StyledButton = styled(Link)`
  background: #6727f1;
  border-radius: 6px;
  color: white;
  width: 20%;
  padding: 10px;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    border: none;
    background: none;
    color: #6726f1;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  background-color: white;
  margin: 10px auto;
  padding: 20px;

  &:active {
    background: linear-gradient(
        0deg,
        rgba(103, 38, 241, 0.16),
        rgba(103, 38, 241, 0.16)
      ),
      #ffffff;
  }

  &:hover,
  &:active {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const VenueCard = ({ venue }) => {
  const { name, city, state } = venue;
  const date = format(new Date(), 'MMMM do');
  return (
    <Card>
      <TimeColumn>
        <MainInfo>Next Event</MainInfo>
        <Detail>{date}</Detail>
      </TimeColumn>
      <InfoColumn>
        <MainInfo>{name}</MainInfo>
        <Detail>
          {city}, {state}
        </Detail>
      </InfoColumn>
      <StyledButton to={`../venue/${venue.id}`}>
        {isMobileDevice ? 'All' : 'All Events'}
      </StyledButton>
    </Card>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.object,
};
