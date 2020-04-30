import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { navigationHeight } from '_constants/styleConstants';
import { Login } from 'pages';
import { logout } from 'store/auth';
import { Modal } from './modal';

const StyledNavigation = styled.div`
  height: ${navigationHeight}px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  left: 150px;
  width: 80%;
  z-index: 1;
`;

const Logo = styled(Link)`
  font-size: 24px;
  color: white;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  color: #FBFBFB;
`;

const UserItems = styled.span`
  padding: 5px;
  font-size: 15px;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  color: #FBFBFB;
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
        <div>
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
        </div>
      ) : (
          <div>
            <UserItems onClick={handlelogout}>Log Out</UserItems>
          </div>
        )}
    </StyledNavigation>
  );
};
