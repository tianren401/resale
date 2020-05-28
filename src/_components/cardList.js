import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';

import { deviceSize } from '_constants';
import { EventCard } from '_components';

const ComponentContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const NoEventsFound = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 20px;
  color: #8d8d94;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  padding: 20px;
`;

export const CardList = ({ topOfPage, eventArray, sectionTitle }) => {
  return (
    <ComponentContainer>
      {!topOfPage && <SectionTitle>{sectionTitle}</SectionTitle>}
      {eventArray?.length ? (
        eventArray.map((event) => {
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
        })
      ) : (
        <NoEventsFound>No Events Found</NoEventsFound>
      )}
    </ComponentContainer>
  );
};

CardList.propTypes = {
  topOfPage: PropTypes.bool,
  eventArray: PropTypes.array,
  sectionTitle: PropTypes.string,
};
