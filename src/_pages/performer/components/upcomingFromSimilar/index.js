import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import { PerformerEventCard } from '../performerEventCard';

const ComponentContainer = styled.div`
  width: 100%;
  transform: skewY(6deg);
  transform-origin: top left;
  background-color: #f0f0f5;

  @media (max-width: ${deviceSize.tablet}px) {
    background-color: white;
  }
`;

const Container = styled.div`
  dislpay: flex;
  justify-content: space-around;
  width: 35%;
  text-align: center;
  transform: skewY(-6deg);
  padding-top: calc(50% * ${Math.tan(0.10472)});
  padding-bottom: calc(50% * ${Math.tan(0.10472)});
  margin: 0 auto;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;
    padding: calc(50% * ${Math.tan(6)}) 10px;
    padding-bottom: 5%;
  }
`;

const MoreEventsText = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  text-align: left;
`;

const LoadMoreButton = styled.button`
  margin-top: 15px;
  border: 1px solid #9c9c9c;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #9c9c9c;
  background-color: #f0f0f5;
  padding: 5px 10px;

  @media (max-width: ${deviceSize.tablet}px) {
    background-color: white;
  }
`;

export const UpcomingFromSimilar = ({ events }) => {
  return (
    <ComponentContainer>
      <Container>
        <MoreEventsText>Upcoming Concerts from Similar Artists</MoreEventsText>

        {events &&
          events.map((event) => {
            return (
              <PerformerEventCard
                event={event}
                key={event.id}
                timestamp={event.timestamp}
                name={event.name}
                venueName={event.venue.name}
                venueState={event.venue.state}
              />
            );
          })}

        <LoadMoreButton>Load More</LoadMoreButton>
      </Container>
    </ComponentContainer>
  );
};

UpcomingFromSimilar.propTypes = {
  events: PropTypes.array,
};
