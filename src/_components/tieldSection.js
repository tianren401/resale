import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { EventTile } from '_components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const TiledSection = ({ events, gutter }) => {
  return (
    <Container>
      {events &&
        events.map((event, index) => {
          const marginVal = (gutter || 20) / 2;
          let width = '';
          let margin = '';
          if (index % 4 === 0 || index % 4 === 3)
            width = `calc(66% - ${marginVal}px)`;
          else width = `calc(34% - ${marginVal}px)`;
          if (index % 2 === 0)
            margin = `${marginVal}px ${marginVal}px ${marginVal}px 0`;
          else margin = `${marginVal}px 0 ${marginVal}px ${marginVal}px`;
          return (
            <EventTile
              key={event.id}
              event={event}
              width={width}
              margin={margin}
            />
          );
        })}
    </Container>
  );
};

TiledSection.propTypes = {
  events: PropTypes.array,
  gutter: PropTypes.number,
};
