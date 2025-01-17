import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { isMobileDevice } from '_helpers';
import { deviceSize } from '_constants';

const Tile = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 200px;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => props.image};
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  width: 100%;
  margin: 8px 16px;
  padding: 20px;
  border-radius: 12px;

  @media (min-width: ${deviceSize.tablet}px) {
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    border-radius: 5px;
    height: 280px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #fbfbfb;
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #fbfbfb;
`;

export const EventTile = ({ event, width, margin, cardImage }) => {
  const desktopImage =
    event?.images?.length &&
    event.images.find((image) => image.imageType === cardImage).imageUrl;
  const mobileImage =
    event?.images?.length &&
    event.images.find((image) => image.imageType === 'trendingMobile').imageUrl;

  return (
    <Tile
      to={
        event.event
          ? `event/${event.event.id}`
          : `performer/${event.performer.id}`
      }
      image={`url(${isMobileDevice ? mobileImage : desktopImage})`}
      width={width}
      margin={margin}
    >
      <Title>{event.event ? event.event.name : event.performer.name}</Title>
      <Description>
        {event.event ? format(new Date(event.event.timestamp), 'MMM d') : ''} ·{' '}
        {event.event ? event.event.venue.name : ''}
      </Description>
    </Tile>
  );
};

EventTile.propTypes = {
  event: PropTypes.object,
  width: PropTypes.any,
  margin: PropTypes.any,
  cardImage: PropTypes.string,
};
