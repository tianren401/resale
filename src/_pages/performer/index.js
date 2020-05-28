import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import { getPerformerEventsAction } from '_store/performer';
import { Upcoming } from './components/upcoming';
import { Footer } from '_pages/home/footer';
import { HomeLayout, PerformerVenueHeader, Faq } from '_components';

const Container = styled(HomeLayout)`
  width: 100%;
`;

export const Performer = ({ performerId }) => {
  const reducer = (state) => state.performerReducer;

  const { events } = useSelector(reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPerformerEventsAction({ id: performerId }));
  }, [dispatch, performerId]);

  const [modalOpen, setModalOpen] = useState(false);

  const getModalState = (state) => {
    setModalOpen(state);
  };

  return (
    <Container>
      {!modalOpen && (
        <PerformerVenueHeader
          attractions={events}
          image={events?.heroImage?.length && events.heroImage[0].imageUrl}
          name={events.name}
          subtitle={events.subtitle}
          type={'performer'}
        />
      )}
      <Upcoming
        events={events}
        sendToPage={getModalState}
        performerId={performerId}
      />
      {isMobileDevice && !modalOpen && <Faq />}
      {!modalOpen && <Footer />}
    </Container>
  );
};

Performer.propTypes = {
  performerId: PropTypes.number,
};
