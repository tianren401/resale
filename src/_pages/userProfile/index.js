import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { UserProfileLayout } from './components/userProfileLayout';
import { Account } from './account';
import { Payments } from './payments';
import { Navigation } from '_components';

export const UserProfile = () => {
  return (
    <>
      <Navigation page="user" />
      <UserProfileLayout>
        <Switch>
          <Route path="/user/account" component={Account} />
          <Route path="/user/payments" component={Payments} />
          <Redirect to="/user/account" />
        </Switch>
      </UserProfileLayout>
    </>
  );
};
