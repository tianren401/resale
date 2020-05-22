import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from '_components';
import { loginAction } from '_store/auth';
import LoginForm from './components/loginForm';

export const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(loginAction(values));
  };
  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

const modelStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    borderRadius: '12px',
    padding: '60px',
  },
};

export const LoginModal = ({ isOpenModal, closeModal }) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      customStyles={modelStyles}
    >
      <Login />
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func,
};
