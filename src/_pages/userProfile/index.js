import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { UserProfileLayout } from './components/userProfileLayout';
import { MobileUserProfile } from './mobile';
import { EditingPage } from './mobile/editingPage';
import { AddPayment } from './mobile/addPayment';
import { Account } from './account';
import { Payments } from './payments';
import { Navigation } from '_components';
import { deviceSize } from '_constants';
import { useViewport } from '_hooks';

export const UserProfile = () => {
  const { width } = useViewport();
  const isMobileDevice = width < deviceSize.tablet;
  return (
    <>
      <Navigation page="user" />
      {isMobileDevice ? (
        <Switch>
          <Route path="/user/mobile" component={MobileUserProfile} />
          <Route path="/user/edit" component={EditingPage} />
          <Route path="/user/payment" component={AddPayment} />
          <Redirect to="/user/mobile" />
        </Switch>
      ) : (
        <UserProfileLayout>
          <Switch>
            <Route path="/user/account" component={Account} />
            <Route path="/user/payments" component={Payments} />
            <Redirect to="/user/account" />
          </Switch>
        </UserProfileLayout>
      )}
    </>
  );
};
