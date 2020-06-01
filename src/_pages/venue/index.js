import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import { getVenueEventsAction } from '_store/venue';
import { Upcoming } from './components/upcoming';
import { Footer } from '_pages/home/footer';
import { HomeLayout, PerformerVenueHeader, Faq } from '_components';

const Container = styled(HomeLayout)`
  width: 100%;
`;

export const Venue = ({ venueId }) => {
  const reducer = (state) => state.venueReducer;

  const { venue } = useSelector(reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVenueEventsAction({ id: venueId }));
  }, [dispatch, venueId]);

  const [modalOpen, setModalOpen] = useState(false);

  const getModalState = (state) => {
    setModalOpen(state);
  };

  const desktopImage =
    venue?.heroImage?.length &&
    venue.heroImage.find((image) => image.imageType === 'heroPV').imageUrl;
  const mobileImage =
    venue?.heroImage?.length &&
    venue.heroImage.find((image) => image.imageType === 'heroPVMobile')
      .imageUrl;

  return (
    <Container>
      {!modalOpen && (
        <PerformerVenueHeader
          attractions={venue}
          image={isMobileDevice ? mobileImage : desktopImage}
          name={venue?.venue?.name}
          subtitle={venue.subtitle}
          type={'venue'}
        />
      )}
      <Upcoming events={venue} sendToPage={getModalState} venueId={venueId} />
      {isMobileDevice && !modalOpen && <Faq />}
      {!modalOpen && <Footer />}
    </Container>
  );
};

Venue.propTypes = {
  performerId: PropTypes.number,
  venueId: PropTypes.number,
};
