import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import { getPerformerEventsAction } from '_store/performer';
import { getVenueEventsAction } from '_store/venue';
import { Header } from './components/header';
import { Upcoming } from './components/upcoming';
import { UpcomingFromOther } from './components/upcomingFromOther';
import { Faq } from './components/faq';
import { Footer } from '_pages/home/footer';

const Container = styled.div`
  width: 100%;
`;

export const PerformerOrVenue = ({ performerId, venueId }) => {
  const reducer = performerId
    ? (state) => state.performerReducer
    : (state) => state.venueReducer;

  const { events } = useSelector(reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (performerId) {
      dispatch(getPerformerEventsAction({ id: performerId }));
    } else {
      dispatch(getVenueEventsAction({ id: venueId }));
    }
  }, [dispatch, performerId, venueId]);

  return (
    <Container>
      <Header events={events.content} />
      <Upcoming events={events.content} />
      <UpcomingFromOther events={events.content} />

      {isMobileDevice && <Faq />}
      <Footer />
    </Container>
  );
};

PerformerOrVenue.propTypes = {
  performerId: PropTypes.number,
  venueId: PropTypes.number,
};
