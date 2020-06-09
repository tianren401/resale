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
import { HomeLayout } from '_components';

const Container = styled(HomeLayout)`
  width: 100%;
`;

export const Home = () => {
  const { eventType } = useSelector((state) => state.eventsReducer);

  const { home } = useSelector((state) => state.homeReducer);

  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

  const dispatch = useDispatch();

  const handleChangeType = (type) => {
    if (eventType === type) return;
    dispatch(setEventTypeAction(type));
  };

  useEffect(() => {
    dispatch(getHomeAction(searchLocation));
  }, [dispatch, searchLocation]);
  return (
    <Container>
      {home && <Hero events={home.hero} />}
      <EventsGroup
        events={home}
        gutter={20}
        onChangeType={handleChangeType}
        eventType={eventType}
      />
      {home.upcoming && <UpcomingSection events={home.upcoming} />}
      <CTASection />
      <Footer />
    </Container>
  );
};
