import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import { getPerformerEventsAction } from '_store/performer';
import { getVenueEventsAction } from '_store/venue';
import { Header } from './components/header';
import { Upcoming } from './components/upcoming';
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

  const [modalOpen, setModalOpen] = useState(false);

  const getModalState = (state) => {
    setModalOpen(state);
  };

  return (
    <Container>
      {!modalOpen && <Header attractions={events} />}
      <Upcoming
        events={events}
        sendToPage={getModalState}
        venueId={venueId}
        performerId={performerId}
      />
      {isMobileDevice && !modalOpen && <Faq />}
      {!modalOpen && <Footer />}
    </Container>
  );
};

PerformerOrVenue.propTypes = {
  performerId: PropTypes.number,
  venueId: PropTypes.number,
};
