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

  const { performer } = useSelector(reducer);

  const dispatch = useDispatch();
  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

  useEffect(() => {
    dispatch(
      getPerformerEventsAction({ id: performerId, location: searchLocation })
    );
  }, [dispatch, performerId, searchLocation]);

  const [modalOpen, setModalOpen] = useState(false);

  const getModalState = (state) => {
    setModalOpen(state);
  };

  const desktopImage =
    performer?.heroImage?.length &&
    performer.heroImage.find((image) => image.imageType === 'heroPV').imageUrl;
  const mobileImage =
    performer?.heroImage?.length &&
    performer.heroImage.find((image) => image.imageType === 'heroPVMobile')
      .imageUrl;

  return (
    <Container>
      {!modalOpen && (
        <PerformerVenueHeader
          attractions={performer}
          image={isMobileDevice ? mobileImage : desktopImage}
          name={performer?.performer?.name}
          subtitle={performer.subtitle}
          type={'performer'}
        />
      )}
      <Upcoming
        events={performer}
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
