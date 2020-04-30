import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { EventCarousel } from 'components';

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px 0;
  max-width: 980px;

  > div {
    margin-bottom: 38px;
  }
`;

const Header = styled.span`
  margin-bottom: 28px;
  margin-left: 20px;
  display: block;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const Filter = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #5a5a5a;
  margin-bottom: 3px;

  > span {
    font-size: 14px;
    line-height: 20px;
    color: #6726f1;
    font-weight: 600;
  }
`;

export const UpcomingSection = ({ events }) => {
  const { sports, concerts, comedies, broadways } = events;
  return (
    <Container>
      <Header>
        <Filter>
          Events near <span>Philadelphia, PA</span>
        </Filter>
        <Title>Upcoming events near you</Title>
      </Header>
      <EventCarousel title="Sports" events={sports}></EventCarousel>
      <EventCarousel title="Concerts" events={concerts}></EventCarousel>
      <EventCarousel title="Comedy" events={comedies}></EventCarousel>
      <EventCarousel title="Broadway" events={broadways}></EventCarousel>
    </Container>
  );
};

UpcomingSection.propTypes = {
  events: PropTypes.object.isRequired,
};
