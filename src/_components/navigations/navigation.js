import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight, deviceSize, colors } from '_constants';
import { logout } from '_store/auth';

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-around;
  height: ${navigationHeight}px;
  padding: 8px 0;
  width: 100%;
  margin: auto;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background: linear-gradient(144.92deg, #455fe5 -14.65%, #9545e5 79.56%);

  @media (min-width: ${deviceSize.tablet}px) {
    padding: 20px 0;
  }
`;

const Logo = styled(Link)`
  color: white;
  float: left;
  font-weight: bold;
  font-size: 24px;
  line-height: 42px;

  color: ${colors.white};

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: ${deviceSize.tablet}px) {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
`;

const MenuContainer = styled.div``;

const UserItems = styled(Link)`
  cursor: pointer;
  display: none;
  color: ${colors.white};
  margin-right: 10px;

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  color: white;

  @media (min-width: ${deviceSize.tablet}px) {
    display: inline-block;
  }
`;

const InitialsBadge = styled.div`
  position: absolute;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.brand};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Navigation = () => {
  const authState = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isAuthorized = !!authState.user;
  const firstInitial = authState?.user?.firstName[0];
  const lastInitial = authState?.user?.lastName[0];
  return (
    <StyledNavigation isAuthorized={isAuthorized}>
      <Logo to="/">SelectSeats</Logo>

      <MenuContainer>
        <UserItems to="/">Sports</UserItems>
        <UserItems to="/">Music</UserItems>
        <UserItems to="/">More</UserItems>
        <UserItems to="/">Support</UserItems>
        <UserItems to="/">My Tickets</UserItems>
        <UserItems onClick={handleLogout}>Log Out</UserItems>
        <UserItems to="/user">
          <InitialsBadge>
            {firstInitial}
            {lastInitial}
          </InitialsBadge>
        </UserItems>
      </MenuContainer>
    </StyledNavigation>
  );
};
