import React from 'react';
import PropTypes from 'prop-types';

import { EventCarousel } from '_components';
import { Container, Header, Filter, Title } from './styledComponents';
import { upcomingEventOptions } from '_constants';

export const UpcomingSection = ({ events }) => {
  return (
    <Container>
      <Header>
        <Filter>
          Events near <span>Philadelphia, PA</span>
        </Filter>
        <Title>Upcoming events near you</Title>
      </Header>
      {upcomingEventOptions.map((item) => (
        <React.Fragment key={item.value}>
          {Object.prototype.hasOwnProperty.call(events, `${item.value}`) && (
            <EventCarousel
              title={item.label}
              events={events[`${item.value}`]}
            ></EventCarousel>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

UpcomingSection.propTypes = {
  events: PropTypes.object.isRequired,
};
