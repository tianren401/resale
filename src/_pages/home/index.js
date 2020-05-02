import React from 'react';
import { fetchSearch } from '_services/actions';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchBar from '_components/SearchBar';

import { UpcomingSection } from './upcomingSection';
import { EventsGroup } from './eventsGroupSection';
import { Hero } from './components/hero';
import { upcomingEvents, trendingEvents } from '_mocks/events';
import { setEventTypeAction } from '_store/homepage';
import { CTASection } from './ctaSection';

const Container = styled.div`
  width: 100%;
  background: linear-gradient(
    197.56deg,
    #455fe5 -5.72%,
    #8245e5 37.62%,
    #ffffff 78.06%
  );
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
      <Hero />
      <SearchBar fetchLocation={fetchSearch} fetchQuery={fetchSearch} />
      <EventsGroup
        events={trendingEvents}
        gutter={20}
        changeType={changeType}
        eventType={eventType}
      />

      <UpcomingSection events={upcomingEvents} />
      <CTASection />
    </Container>
  );
};
