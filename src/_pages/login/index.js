import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isMobileDevice } from '_helpers';
import { loginAction, signupAction } from '_store/auth';
import LoginForm from './components/loginForm';
import { useModal } from '_hooks/useModal';
import { setLoginType } from '_store/ui';

export const Login = () => {
  const uiReducer = (state) => state.uiReducer;
  const { loginType } = useSelector(uiReducer);
  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [findTicketMessage, setFindTicketMessage] = useState('');

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  async function tryLogin(values) {
    return dispatch(loginAction(values));
  }

  async function trySignup(values) {
    return dispatch(signupAction(values));
  }

  const handleLoginSubmit = (values) => {
    tryLogin(values).then((data) => {
      if (data.type === 'auth/login/fulfilled') {
        setLoginMessage('Sign in Successful!');
        setTimeout(() => closeModal(), 1000);
      } else {
        if (isMobileDevice) {
          setLoginMessage('Invalid email or password');
        } else {
          setLoginMessage('You have entered an invalid email or password');
        }
      }
    });
  };

  const handleSignupSubmit = (values) => {
    trySignup(values).then((data) => {
      if (data.type === 'auth/signup/fulfilled') {
        setSignupMessage('Sign Up Successful!');
        setTimeout(() => closeModal(), 1000);
      } else {
        setSignupMessage('That email is already registered');
      }
    });
  };

  const handleFindTicket = (values) => {
    const { email, phone, orderId } = values;
    const rawPhone = phone.replace(/[^0-9]/g, '');
    setFindTicketMessage('');
    window.location.href = `/orders/${orderId}?email=${email}&phone=${rawPhone}`;
  };

  const handleModalSwitch = (loginType) => {
    dispatch(setLoginType(loginType));
  };

  const handleSubmit = (values) => {
    switch (loginType) {
      case 'Sign In':
        handleLoginSubmit(values);
        break;

      case 'Sign Up':
        handleSignupSubmit(values);
        break;

      case 'Reset Password':
        handleModalSwitch('Reset Instructions Sent');
        break;

      case 'Reset Instructions Sent':
        handleModalSwitch('Sign In');
        break;

      case 'Find Ticket':
        handleFindTicket(values);
        break;

      default:
        break;
    }
  };

  let statusMessage;

  switch (loginType) {
    case 'Sign In':
      statusMessage = loginMessage;
      break;

    case 'Sign Up':
      statusMessage = signupMessage;
      break;

    case 'Find Ticket':
      statusMessage = findTicketMessage;
      break;

    default:
      break;
  }

  return <LoginForm handleSubmit={handleSubmit} loginMessage={statusMessage} />;
};

export const LoginModal = () => {
  const { Modal, closeModal, isOpenModal } = useModal();
  const uiReducer = (state) => state.uiReducer;
  const { loginType } = useSelector(uiReducer);

  const modalDesktopStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: loginType.includes('Reset') ? 'auto' : '620px',
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

  return (
    <Modal
      isOpen={isOpenModal}
      closeModal={closeModal}
      customStyles={isMobileDevice ? modalMobileStyles : modalDesktopStyles}
    >
      <Login />
    </Modal>
  );
};
