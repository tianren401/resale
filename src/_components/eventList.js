import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deviceSize } from '_constants';

const StyledEventList = styled.div`
  dislpay: flex;
  justify-content: space-around;
  margin: 0 20%;
  padding-top: calc(50% * ${Math.tan(0.10472)});
  padding-bottom: calc(50% * ${Math.tan(0.10472)});
  transform: ${({ skew }) => (skew ? 'skewY(-6deg)' : 'none')};

  @media (max-width: ${deviceSize.tablet}px) {
    padding: calc(50% * ${Math.tan(0.10472)}) 10px;
    margin: 0;
  }
`;

export const EventList = (props) => {
  return <StyledEventList skew={props.skew}>{props.children}</StyledEventList>;
};

EventList.propTypes = {
  skew: PropTypes.bool,
  children: PropTypes.node,
};
