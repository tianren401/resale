import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight, deviceSize, colors } from '_constants';
import { Login } from '_pages';
import { logout } from '_store/auth';
import { Modal } from './modal';
import { ContentImage } from '_components/styledTags';
import mobileNavigationIcon from '_images/mobileNavigationIcon.png';

const StyledNavigation = styled.div`
  height: ${navigationHeight}px;
  padding: 8px 0;
  position: absolute;
  width: 90%;
  left: 5%;
  margin: auto;
  z-index: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  @media (min-width: ${deviceSize.tablet}) {
    padding: 20px 0;
    width: 60%;
    left: 20%;
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
    color: ${colors.brandHover};
  }

  @media (min-width: ${deviceSize.tablet}) {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
`;

const MenuContainer = styled.div`
  float: right;
`;

const UserItems = styled(Link)`
  cursor: pointer;
  display: none;
  color: ${colors.white};

  &:hover {
    color: ${colors.brand};
  }

  &:not(:last-of-type) {
    margin-right: 10px;
  }
  color: white;

  @media (min-width: ${deviceSize.tablet}) {
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

  @media (min-width: ${deviceSize.tablet}) {
    display: none;
  }
`;

export const Navigation = () => {
  const authState = useSelector(({ authReducer }) => authReducer);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleModalOpen = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const handlelogout = () => {
    setIsOpenModal(false);
    dispatch(logout());
  };
  const isAuthorised = !!authState.user;
  return (
    <StyledNavigation>
      <Logo to="/">SelectSeats</Logo>
      {!isAuthorised ? (
        <MenuContainer>
          <UserItems to="/">Sports</UserItems>
          <UserItems to="/">Music</UserItems>
          <UserItems to="/">More</UserItems>
          <UserItems to="/">Sell</UserItems>
          <UserItems to="/">Support</UserItems>
          <UserItems to="/" onClick={handleModalOpen}>
            Sign In
          </UserItems>
          <UserItems to="/">Sign Up</UserItems>
          <UserItemsMobile to="/" onClick={handleModalOpen}>
            Sign In
          </UserItemsMobile>
          <UserItemsMobile>
            <ContentImage src={mobileNavigationIcon} />
          </UserItemsMobile>
        </MenuContainer>
      ) : (
        <div>
          <UserItems onClick={handlelogout}>Log Out</UserItems>
        </div>
      )}
      <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
        <Login />
      </Modal>
    </StyledNavigation>
  );
};
