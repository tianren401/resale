import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import { getEventsAction } from '_store/events';
import { Header } from './components/header';
import { UpcomingFromPerformer } from './components/upcomingFromPerformer';
import { UpcomingFromSimilar } from './components/upcomingFromSimilar';
import { PerformerFaq } from './components/performerFaq';
import { Footer } from '_pages/home/footer';

const Container = styled.div`
  width: 100%;
`;

export const Performer = () => {
  const { eventsGroup, eventType } = useSelector(
    (state) => state.eventsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsAction({ page: 0, size: 20 }));
  }, [dispatch]);
  return (
    <Container>
      <Header />
      <UpcomingFromPerformer events={eventsGroup[eventType]} />
      <UpcomingFromSimilar events={eventsGroup[eventType]} />
      {isMobileDevice && <PerformerFaq />}
      <Footer />
    </Container>
  );
};
