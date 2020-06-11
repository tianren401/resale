import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Emoji,
  Flex,
  H4,
  H5,
  Loader,
  TextButton,
  UserImage,
} from '_components';
import { colors, navigationHeight } from '_constants';
import { getClientToken } from '_store/checkout';
import { logout } from '_store/auth';
import { SavedCardDropin } from './savedCardDropin';

const StyledBackgorund = styled.div`
  width: 100%;
  height: calc(100vh - ${navigationHeight}px);
  position: relative;
  padding: 0 20px;
`;

const TriangleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(95.18deg, #455fe5 11.43%, #8245e5 102.7%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 55%);
  z-index: -1;
`;

const UserInfo = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(95.18deg, #455fe5 11.43%, #8245e5 102.7%);
`;

const Title = styled(H4)`
  color: ${colors.white};
  text-align: center;
  padding-top: 28px;
`;

const Setting = styled(Flex)`
  margin: 30px auto;
  width: 100%;
  flex-direction: column;
`;

const SettingItem = styled(Flex)`
  width: 100%;
  padding: 9px 0;
  color: ${colors.black};
  border-bottom: 1px solid ${colors.lightGray};
`;

const StyledTextButton = styled(TextButton)`
  font-size: 12px;
  line-height: 22px;
`;

const LogoutButton = styled.div`
  margin: 24px 0 100px;
  border: 1px solid ${colors.brand};
  border-radius: 6px;
  background: ${colors.white};
  color: ${colors.brand};
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  padding: 14px 0;

  &:hover {
    background: ${colors.brand};
    color: ${colors.white};
  }
`;

const Container = styled.div`
  max-width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
`;

export const MobileUserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.authReducer);
  const { loading } = useSelector((state) => state.checkoutReducer);

  useEffect(() => {
    dispatch(
      getClientToken({
        success: () => {},
      })
    );
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEdit = (target) => {
    history.push({
      pathname: '/user/edit',
      state: { target },
    });
  };

  const handleAddPayment = () => {
    history.push('/user/payment');
  };

  if (loading || !user) return <Loader centered />;

  return (
    <StyledBackgorund>
      <TriangleOverlay />
      <Container>
        <div>
          <Title>
            <Emoji symbol="👋" /> Welcome back, {user.firstName}!
          </Title>
          <UserInfo>
            <UserImage>
              {user.firstName[0]}
              {user.lastName[0]}
            </UserImage>
          </UserInfo>
          <Setting>
            <SettingItem>
              <H5 weight="600">Account</H5>
            </SettingItem>
            <SettingItem justify="space-between">
              <H5>Phone number</H5>
              <StyledTextButton onClick={() => handleEdit('phone')}>
                {user.phone}
              </StyledTextButton>
            </SettingItem>
            <SettingItem justify="space-between">
              <H5>Email address</H5>
              <StyledTextButton disabled>{user.email}</StyledTextButton>
            </SettingItem>
            <SettingItem>
              <StyledTextButton
                color={colors.black}
                hoverColor={colors.darkGray}
                onClick={() => handleEdit('password')}
              >
                Change your password
              </StyledTextButton>
            </SettingItem>
          </Setting>
          <Setting>
            <SettingItem>
              <H5 weight="600">Payment</H5>
            </SettingItem>
            <SavedCardDropin method="save" />
            <SettingItem>
              <StyledTextButton
                color={colors.black}
                hoverColor={colors.darkGray}
                onClick={handleAddPayment}
              >
                Add a new card
              </StyledTextButton>
            </SettingItem>
          </Setting>
        </div>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </Container>
    </StyledBackgorund>
  );
};
