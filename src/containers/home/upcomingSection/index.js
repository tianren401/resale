import React from 'react';
import styled from 'styled-components';

import { EventCarousel } from 'components';
import { sportEvents, concertEvents, comedyEvents, broadwayEvents } from './testData';

const Container = styled.div`
  margin: auto;
  width: 60%;

  > div {
    margin-bottom: 38px;
  }
`;

const Header = styled.span`
  margin-bottom: 28px;
  margin-left: 21px;
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
`;

const RegionName = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #6726f1;
  font-weight: 600;
`;

export const UpcomingSection = () => {
  return (
    <Container>
      <Header>
        <Filter>
          Events near <RegionName>Philadelphia, PA</RegionName>
        </Filter>
        <Title>Upcoming events near you</Title>
      </Header>
      <EventCarousel title="Sports" events={sportEvents}></EventCarousel>
      <EventCarousel title="Concerts" events={concertEvents}></EventCarousel>
      <EventCarousel title="Comedy" events={comedyEvents}></EventCarousel>
      <EventCarousel title="Broadway" events={broadwayEvents}></EventCarousel>
    </Container>
  );
};
