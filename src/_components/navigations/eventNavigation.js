import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight, colors } from '_constants';

const Container = styled.div`
  height: ${navigationHeight}px;
  padding: 20px 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: linear-gradient(144.92deg, #455fe5 -14.65%, #9545e5 79.56%);
`;

const Logo = styled(Link)`
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  color: ${colors.white};
  z-index: 1;
`;

const UserItemsContainer = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`;

const UserItem = styled(Link)`
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.white};
  margin: 0 5px;
`;

export const EventNavigation = () => {
  return (
    <Container>
      <Logo to="/">SelectSeats</Logo>
      <UserItemsContainer>
        <UserItem to="/">Support</UserItem>
        <UserItem to="/">Sign In</UserItem>
        <UserItem to="/">Sign Up</UserItem>
      </UserItemsContainer>
    </Container>
  );
};
