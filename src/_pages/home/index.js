import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchBar from '_components/SearchBar';

import { UpcomingSection } from './upcomingSection';
import { EventsGroup } from './eventsGroupSection';
import { Hero } from './hero';
import { upcomingEvents, trendingEvents, headerEvents } from '_mocks/events';
import { setEventTypeAction } from '_store/homepage';
import { CTASection } from './ctaSection';
import { Footer } from './footer';

import { Container as RowContainer } from '_components';
const Container = styled.div`
  width: 100%;
`;

export const Home = () => {
  const eventType = useSelector(
    ({ homepageReducer }) => homepageReducer.eventType
  );

  const dispatch = useDispatch();
  const changeType = (type) => {
    dispatch(setEventTypeAction(type));
  };

  return (
    <Container>
      <Hero events={headerEvents} />
      <RowContainer>
        <SearchBar />
      </RowContainer>
      <EventsGroup
        events={trendingEvents}
        gutter={20}
        changeType={changeType}
        eventType={eventType}
      />

      <UpcomingSection events={upcomingEvents} />
      <CTASection />
      <Footer />
    </Container>
  );
};
