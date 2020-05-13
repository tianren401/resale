import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import checkImage from '_images/checkImageMobile.png';
import headerImage from '_images/mocks/headerImage.jpg';
import { deviceSize } from '_constants';
import { isMobileDevice } from '_helpers';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40vh;
  background-color: #a9a9a9;
  justify-content: center;
  background-image: url(${headerImage});
  background-size: cover;
  background-position: center;
  background-position-x: center;
  background-position-y: center;
`;

const Performer = styled.div`
  position: relative;
  top: 10%;
  font-weight: bold;
  font-size: 38px;
  line-height: 46px;
  color: white;
  padding: 50px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 50px 50px 50px 10px;
    width: 100%;
    text-align: left;
  }
`;

const Subtitle = styled.div`
  display: flex;
  color: white;
  font-size: 24px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
  }
`;

const Check = styled.img`
  height: 20px;
  width: 20px;
  margin: 5px;
`;

export const Header = ({ events }) => {
  return (
    <StyledHeader>
      <Performer>{events && events[0].performers[0].name}</Performer>
      <Subtitle>
        {isMobileDevice ? (
          'Here is a message that will be in several lines, so we see the text as it wraps.'
        ) : (
          <>
            {' '}
            <Check src={checkImage} /> Millions of Customers Served • 100%
            Guaranteed • Low Fees{' '}
          </>
        )}
      </Subtitle>
    </StyledHeader>
  );
};

Header.propTypes = {
  events: PropTypes.array,
  performerId: PropTypes.number,
  venueId: PropTypes.number,
};
