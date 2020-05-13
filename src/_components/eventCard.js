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
`;

const InfoColumn = styled(FlexColumn)`
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MainInfo = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #121212;
`;

const Detail = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #606060;
`;

const StyledButton = styled.button`
  background: #6727f1;
  border-radius: 6px;
  color: white;
  width: 20%;
  padding: 10px;
  margin: 10px;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 10%;
    background: #3dcc79;
    font-weight: 600;
    font-size: 12px;
    line-height: 24px;
    padding: 0px;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  background-color: white;
  margin: 10px auto;
  padding: 10px;

  @media (max-width: ${deviceSize.tablet}px) {
    border: none;
    border-bottom: 1px solid #e9e9e9;
  }
`;

export const EventCard = ({ event, name, venueName, venueState }) => {
  const timestamp = event.timestamp;
  const date = format(new Date(timestamp), 'MMMM do');
  const timeDate = format(new Date(timestamp), 'iii h:mm a');

  return (
    <Card to={`../event/${event.id}`}>
      <TimeColumn>
        <MainInfo>{date}</MainInfo>
        <Detail>{timeDate}</Detail>
      </TimeColumn>
      <InfoColumn>
        <MainInfo>{name}</MainInfo>
        <Detail>
          {venueName} {venueState}
        </Detail>
      </InfoColumn>
      <StyledButton>{isMobileDevice ? '$130+' : 'From $130'}</StyledButton>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.object,
  name: PropTypes.string,
  venueName: PropTypes.string,
  venueState: PropTypes.string,
};
