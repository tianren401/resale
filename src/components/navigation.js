import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Login } from 'containers';
import { logout } from 'store/auth';
import { Modal } from './modal';

const StyledNavigation = styled.div`
  background-color: indianred;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  color: white;
`;

const UserItems = styled.button`
  padding: 5px;
  font-size: 15px;
  &:not(:last-of-type) {
    margin-right: 10px;
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
      <Logo to="/">Logo</Logo>
      {!isAuthorised ? (
        <div>
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
