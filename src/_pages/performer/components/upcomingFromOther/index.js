import React from 'react';
import PropTypes from 'prop-types';

import { EventList, PerformerVenueSimilarCarousel } from '_components';
import {
  ComponentContainer,
  CarouselTitle,
  NoEventsFound,
} from './styledComponents';

export const UpcomingFromOther = ({ similar, carouselTitle }) => {
  return (
    <ComponentContainer>
      <EventList skew={true}>
        <CarouselTitle>{carouselTitle}</CarouselTitle>

        {similar?.length ? (
          <PerformerVenueSimilarCarousel
            itemsToShow={4}
            similar={similar}
            type={'performer'}
          />
        ) : (
          <NoEventsFound>Nothing Found.</NoEventsFound>
        )}
      </EventList>
    </ComponentContainer>
  );
};

UpcomingFromOther.propTypes = {
  similar: PropTypes.array,
  carouselTitle: PropTypes.string,
};
