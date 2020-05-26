import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import { EventList } from '_components';
import { SimilarCarousel } from '../similarCarousel';

const ComponentContainer = styled.div`
  width: 100%;
  transform: skewY(6deg);
  transform-origin: top left;
  background: linear-gradient(96.1deg, #455fe5 -14.65%, #9545e5 79.56%);
  padding: 50px;

  @media (max-width: ${deviceSize.tablet}px) {
    background: white;
    padding: 0;
  }
`;

const MoreEventsText = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  color: white;

  @media (max-width: ${deviceSize.tablet}px) {
    color: black;
  }
`;

const NoEventsFound = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 20px;
  color: white;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const UpcomingFromOther = ({ similar }) => {
  let similarText;
  if (similar && similar[0].venue) {
    similarText = 'Similar Venues';
  } else if (similar && similar[0].performer) {
    similarText = 'Similar Performers';
  }
  return (
    <ComponentContainer>
      <EventList skew={true}>
        <MoreEventsText>{similarText && similarText}</MoreEventsText>

        {similar?.length ? (
          <SimilarCarousel itemsToShow={4} similar={similar} />
        ) : (
          <NoEventsFound>Nothing Found.</NoEventsFound>
        )}
      </EventList>
    </ComponentContainer>
  );
};

UpcomingFromOther.propTypes = {
  similar: PropTypes.array,
};
