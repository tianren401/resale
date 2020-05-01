import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { deviceSize } from '_constants';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 200px;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(130, 136, 148, 0.16);
  width: 100%;
  margin: 8px 16px;
  border-radius: 12px;

  @media (min-width: ${deviceSize.tablet}) {
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    border-radius: 5px;
    height: 280px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #fbfbfb;
  padding-left: 18px;
`;

const Description = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #fbfbfb;
  padding: 0 0px 18px 18px;
`;

export const EventTile = ({ event, width, margin }) => {
  let imgUri = event.venue.image || '';
  if (!imgUri.startsWith('http')) {
    imgUri = require(`../${imgUri}`);
  }
  let date = format(new Date(event.timestamp), 'MMM d');
  return (
    <Tile style={{ backgroundImage: `url(${imgUri})` }} width={width} margin={margin}>
      <Title>{event.name}</Title>
      <Description>
        {date} · {event.venue.name}
      </Description>
    </Tile>
  );
};

EventTile.propTypes = {
  event: PropTypes.object,
  width: PropTypes.any,
  margin: PropTypes.any,
};