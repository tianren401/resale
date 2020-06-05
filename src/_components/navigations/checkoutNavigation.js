import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight, colors, deviceSize } from '_constants';

const StyledCheckoutHeader = styled.div`
  height: ${navigationHeight}px;
  width: 100%;
  background: linear-gradient(144.92deg, #455fe5 -14.65%, #9545e5 79.56%);
  padding: 0 8%;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 0 20px;
  }
`;

const Container = styled.div`
  max-width: 1128px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  align-items: center;
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

  @media (max-width: ${deviceSize.tablet}px) {
    display: ${(props) => (props.mobile ? 'block' : 'none')};
  }
`;

export const CheckoutNavigation = () => {
  return (
    <StyledCheckoutHeader>
      <Container>
        <UserItems mobile="true" to="/">
          SelectSeats
        </UserItems>
        <UserItems to="/">Support</UserItems>
      </Container>
    </StyledCheckoutHeader>
  );
};
