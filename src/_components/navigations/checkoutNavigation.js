import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight, colors, deviceSize } from '_constants';

const Container = styled.div`
  height: ${navigationHeight}px;
  padding: 20px 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: linear-gradient(144.92deg, #455fe5 -14.65%, #9545e5 79.56%);
`;

const UserItems = styled(Link)`
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.white};

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: ${deviceSize.tablet}px) {
    display: inline-block;
  }
`;

export const CheckoutNavigation = () => {
  return (
    <Container>
      <UserItems to="/">SelectSeats</UserItems>
      <UserItems to="/">Support</UserItems>
    </Container>
  );
};
