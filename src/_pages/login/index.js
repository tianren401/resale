import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { isMobileDevice } from '_helpers';
import { loginAction, signupAction } from '_store/auth';
import LoginForm from './components/loginForm';
import { useModal } from '_hooks/useModal';

export const Login = ({ loginType }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleSubmit = (values) => {
    dispatch(loginAction(values));
    closeModal();
  };
  return <LoginForm handleSubmit={handleSubmit} loginType={loginType} />;
};

export const Signup = ({ loginType }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleSubmit = (values) => {
    dispatch(signupAction(values));
    closeModal();
  };
  return <LoginForm handleSubmit={handleSubmit} loginType={loginType} />;
};

const modalDesktopStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '620px',
    borderRadius: '12px',
    padding: '30px 60px 60px 60px',
  },
};

const modalMobileStyles = {
  content: {
    height: '100vh',
    width: '100vw',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
};

export const LoginModal = ({ loginType }) => {
  const { Modal, closeModal, isOpenModal } = useModal();
  return (
    <Modal
      isOpen={isOpenModal}
      closeModal={closeModal}
      customStyles={isMobileDevice ? modalMobileStyles : modalDesktopStyles}
    >
      {loginType === 'Sign Up' ? (
        <Signup loginType={loginType} />
      ) : (
        <Login loginType={loginType} />
      )}
    </Modal>
  );
};

LoginModal.propTypes = {
  loginType: PropTypes.string,
};

Signup.propTypes = {
  loginType: PropTypes.string,
};

Login.propTypes = {
  loginType: PropTypes.string,
};
