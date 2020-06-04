import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { isMobileDevice } from '_helpers';
import { navigationHeight, deviceSize, colors } from '_constants';
import { LoginModal } from '_pages';
import { useModal } from '_hooks/useModal';

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-around;
  height: ${navigationHeight}px;
  padding: 8px 0;
  position: absolute;
  width: 100%;
  margin: auto;

  z-index:  ${({ hidden }) => (hidden ? '0' : '1')};

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  ${({ isAuthorized }) =>
    isAuthorized &&
    'background: linear-gradient(144.92deg, #455FE5 -14.65%, #9545E5 79.56%);'}

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

const ModalItems = styled.span`
  cursor: pointer;
  display: none;
  color: ${colors.white};

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  color: white;

  @media (min-width: ${deviceSize.tablet}px) {
    display: inline-block;
  }
`;

const UserItemsMobile = styled.span`
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 42px;
  margin-right: 16px;
  vertical-align: center;

  &:not(:last-of-type) {
    margin-right: 10px;
  }
  color: white;

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: ${deviceSize.tablet}px) {
    display: none;
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

export const HomeNavigation = () => {
  const authState = useSelector(({ authReducer }) => authReducer);
  const [loginType, setType] = useState('');
  const { openModal, isOpenModal } = useModal();

  const handleModalOpen = (modal) => {
    openModal();
    setType(modal);
  };

  const isAuthorized = !!authState.user;
  return (
    <StyledNavigation isAuthorized={isAuthorized} hidden={isOpenModal}>
      <Logo to="/">SelectSeats</Logo>

      <MenuContainer>
        <UserItems to="/">Sports</UserItems>
        <UserItems to="/">Music</UserItems>
        <UserItems to="/">More</UserItems>
        <UserItems to="/">Support</UserItems>
        <UserItems to="/">My Tickets</UserItems>
        {isAuthorized ? (
          <>
            <UserItems>
              <InitialsBadge>AA</InitialsBadge>
            </UserItems>
            {/* <UserItems onClick={handlelogout}>Log Out</UserItems> */}
          </>
        ) : (
          <>
            <ModalItems onClick={() => handleModalOpen('Log In')}>
              Sign In
            </ModalItems>
            <ModalItems onClick={() => handleModalOpen('Sign Up')}>
              Sign Up
            </ModalItems>
            <UserItemsMobile to="/" onClick={() => handleModalOpen('Log In')}>
              Sign In
            </UserItemsMobile>
          </>
        )}
        {isAuthorized && isMobileDevice && <InitialsBadge>AA</InitialsBadge>}
      </MenuContainer>

      <LoginModal loginType={loginType} />
    </StyledNavigation>
  );
};
