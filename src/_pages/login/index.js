import React from 'react';
import { useDispatch } from 'react-redux';

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
