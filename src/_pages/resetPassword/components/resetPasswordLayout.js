import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { isMobileDevice } from '_helpers';
import userProfileBackground from '_images/userProfileBackground.png';

const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 840px;
  background-image: ${isMobileDevice ? 'none' : `url(${userProfileBackground})`},
    linear-gradient(
      0deg,
      rgba(86, 40, 218, 0.45) -100%,
      rgba(255, 255, 255, 1) 60%
    );
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%, 100% 100%;
  background-position: center, center;
  padding: 50px 100px;
  background-blend-mode: screen;
`;

export const ResetPasswordLayout = ({ children }) => {
  return <StyledBackground>{children}</StyledBackground>;
};

ResetPasswordLayout.propTypes = {
  children: PropTypes.node,
};
