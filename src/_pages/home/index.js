import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { UpcomingSection } from './upcomingSection';
import { EventsGroup } from './eventsGroupSection';
import { Hero } from './hero';

import { setEventTypeAction } from '_store/events';
import { getHomeAction } from '_store/home';
import { CTASection } from './ctaSection';
import { Footer } from './footer';
import { SearchRowContainer, SearchBar } from '_components';

const Container = styled.div`
  width: 100%;
`;

export const Home = () => {
  const { eventType } = useSelector((state) => state.eventsReducer);

  const { home } = useSelector((state) => state.homeReducer);

  const dispatch = useDispatch();

  const handleChangeType = (type) => {
    if (eventType === type) return;
    dispatch(setEventTypeAction(type));
  };

  useEffect(() => {
    dispatch(getHomeAction());
  }, [dispatch]);
  return (
    <Container>
      {home && <Hero events={home.hero} />}
      <SearchRowContainer>
        <SearchBar />
      </SearchRowContainer>
      <EventsGroup
        events={home}
        gutter={20}
        onChangeType={handleChangeType}
        eventType={eventType}
      />
      <UpcomingSection events={home.upcoming} />
      <CTASection />
      <Footer />
    </Container>
  );
};
