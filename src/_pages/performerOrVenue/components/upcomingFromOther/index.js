import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import { EventCard, EventList, LoadMoreButton } from '_components';

const ComponentContainer = styled.div`
  width: 100%;
  transform: skewY(6deg);
  transform-origin: top left;
  background: linear-gradient(96.1deg, #455fe5 -14.65%, #9545e5 79.56%);
  padding: 50px;

  @media (max-width: ${deviceSize.tablet}px) {
    background: white;
    padding: 0;
  }
`;

const MoreEventsText = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  color: white;

  @media (max-width: ${deviceSize.tablet}px) {
    color: black;
  }
`;

export const UpcomingFromOther = ({ events }) => {
  return (
    <ComponentContainer>
      <EventList skew={true}>
        <MoreEventsText>Similar Artists</MoreEventsText>

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

        <LoadMoreButton />
      </EventList>
    </ComponentContainer>
  );
};

UpcomingFromOther.propTypes = {
  events: PropTypes.array,
};
