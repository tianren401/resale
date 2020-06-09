import React from 'react';
import PropTypes from 'prop-types';

import { EventCarousel } from '_components';
import { Container, Header, Title } from './styledComponents';

export const UpcomingSection = ({ events }) => {
  const sports = events?.sports;
  const concerts = events?.concerts;
  const theater = events?.theater;
  const other = events?.other;
  const upcomingTypes = [sports, concerts, theater, other];

  return (
    <Container>
      <Header>
        <Title>Upcoming events near you</Title>
      </Header>
      {events &&
        upcomingTypes.map((type) => {
          const typeName = Object.keys(events)[upcomingTypes.indexOf(type)];
          const capitalTypeName =
            typeName.charAt(0).toUpperCase() + typeName.slice(1);
          return (
            <EventCarousel
              key={events && upcomingTypes.indexOf(type)}
              title={events && capitalTypeName}
              events={events && type}
              itemsToShow={4}
            ></EventCarousel>
          );
        })}
    </Container>
  );
};

UpcomingSection.propTypes = {
  events: PropTypes.object.isRequired,
};
