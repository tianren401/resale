import React from 'react';

import { ResetPasswordLayout } from './components/resetPasswordLayout';
import { Navigation } from '_components';
import ResetPasswordForm from './components/resetPasswordForm';

export const ResetPassword = () => {
  return (
    <>
      <Navigation page="user" />
      <ResetPasswordLayout>
        <ResetPasswordForm />
      </ResetPasswordLayout>
    </>
  );
};
