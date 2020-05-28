import React from 'react';
import styled from 'styled-components';

import { deviceSize } from '_constants';

const StyledLoadMoreButton = styled.div`
  margin: 20px auto;
  width: 150px;
  border: 1px solid #9c9c9c;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #6726f1;
  background-color: white;
  padding: 14px 24px;
  cursor: pointer;

  @media (max-width: ${deviceSize.tablet}px) {
    background-color: white;
    border: 1px solid #6726f1;
  }
`;

export const LoadMoreButton = (props) => {
  return <StyledLoadMoreButton {...props}>Load More</StyledLoadMoreButton>;
};
