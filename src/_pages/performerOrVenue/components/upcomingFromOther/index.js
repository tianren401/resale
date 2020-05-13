import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import { EventCard, EventList } from '_components';

const ComponentContainer = styled.div`
  width: 100%;
  transform: skewY(6deg);
  transform-origin: top left;
  background: linear-gradient(96.1deg, #455fe5 -14.65%, #9545e5 79.56%);
  padding: 50px;

  @media (max-width: ${deviceSize.tablet}px) {
    background-color: white;
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
  color: #6726f1;
  background-color: #f0f0f5;
  padding: 5px 10px;

  @media (max-width: ${deviceSize.tablet}px) {
    background-color: white;
  }
`;

export const UpcomingFromOther = ({ events }) => {
  return (
    <ComponentContainer>
      <EventList skew={true}>
        <MoreEventsText>Upcoming Concerts from Similar Artists</MoreEventsText>

        {events &&
          events.map((event) => {
            return (
              <EventCard
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
      </EventList>
    </ComponentContainer>
  );
};

UpcomingFromOther.propTypes = {
  events: PropTypes.array,
};
