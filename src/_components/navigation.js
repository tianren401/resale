import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight } from '_constants';
import { Login } from '_pages';
import { logout } from '_store/auth';
import { Modal } from './modal';

const StyledNavigation = styled.div`
  height: ${navigationHeight}px;
  padding: 20px 0;
  position: absolute;
  width: 60%;
  left: 20%;
  margin: auto;
  z-index: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const Logo = styled(Link)`
  color: white;
  float: left;
`;

const MenuContainer = styled.div`
  float: right;
`;

const UserItems = styled.span`
  padding: 5px;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-right: 10px;
  }
  color: white;
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
          <UserItems>Sports</UserItems>
          <UserItems>Music</UserItems>
          <UserItems>More</UserItems>
          <UserItems>Sell</UserItems>
          <UserItems>Support</UserItems>
          <UserItems onClick={handleModalOpen}>Log In</UserItems>
          <UserItems>Sign Up</UserItems>
          <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
            <Login />
          </Modal>
        </MenuContainer>
      ) : (
        <div>
          <UserItems onClick={handlelogout}>Log Out</UserItems>
        </div>
      )}
    </StyledNavigation>
  );
};
