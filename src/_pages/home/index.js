import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { UpcomingSection } from './upcomingSection';
import { EventsGroup } from './eventsGroupSection';
import { Hero } from './hero';
import { setEventTypeAction, getEventsAction } from '_store/events';
import { CTASection } from './ctaSection';
import { Footer } from './footer';
import { RowContainer, SearchBar } from '_components';

const Container = styled.div`
  width: 100%;
`;

export const Home = () => {
  const { heroEvents, eventsGroup, upcomingEvents, eventType } = useSelector(
    (state) => state.eventsReducer
  );

  const dispatch = useDispatch();
  const handleChangeType = (type) => {
    if (eventType === type) return;
    dispatch(setEventTypeAction(type));
  };

  useEffect(() => {
    dispatch(getEventsAction({ page: 0, size: 20 }));
  }, [dispatch]);
  return (
    <Container>
      {heroEvents.length && <Hero events={heroEvents} />}
      <RowContainer>
        <SearchBar />
      </RowContainer>
      {Object.prototype.hasOwnProperty.call(eventsGroup, `${eventType}`) && (
        <EventsGroup
          events={eventsGroup[`${eventType}`]}
          gutter={20}
          onChangeType={handleChangeType}
          eventType={eventType}
        />
      )}
      <UpcomingSection events={upcomingEvents} />
      <CTASection />
      <Footer />
    </Container>
  );
};
