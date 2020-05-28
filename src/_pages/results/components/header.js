import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 190px;
  justify-content: center;
  background: linear-gradient(122.56deg, #455fe5 -14.65%, #9545e5 79.56%);
  mix-blend-mode: normal;
`;

export const Header = () => {
  return <StyledHeader />;
};

Header.propTypes = {
  events: PropTypes.array,
  performerId: PropTypes.number,
  venueId: PropTypes.number,
};
