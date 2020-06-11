import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Flex, FlexItem, Loader, UserImage, H3, Emoji } from '_components';
import { colors, navigationHeight } from '_constants';
import userProfileBackground from '_images/userProfileBackground.png';
import { UserProfileSidebar } from './userProfileSidebar';
import { setSidebarStage } from '_store/userProfile';

const StyledBackground = styled.div`
  width: 100%;
  height: calc(100vh - ${navigationHeight}px);
  min-height: 800px;
  background-image: ${`url(${userProfileBackground})`},
    linear-gradient(
      0deg,
      rgba(86, 40, 218, 0.45) -100%,
      rgba(255, 255, 255, 1) 60%
    );
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%, 100% 100%;
  background-position: center, center;
  padding: 50px 100px;
  background-blend-mode: screen;
`;

const Container = styled.div`
  max-width: 980px;
  margin: auto;
`;

const Title = styled(H3)`
  > div {
    display: inline-block;
    background: ${colors.gradientVioletBlue};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const UserContent = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-left: 20px;
  color: ${colors.darkGray};

  > span {
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    color: ${colors.black};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 45px;
`;

export const UserProfileLayout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.authReducer);
  const { sidebarStage } = useSelector((state) => state.userProfileReducer);

  useEffect(() => {
    return () => {
      dispatch(setSidebarStage(0));
    };
  }, [dispatch]);

  const handleSidebarStage = (index, url) => {
    dispatch(setSidebarStage(index));
    history.push(url);
  };

  if (!user)
    return (
      <StyledBackground>
        <Loader centered />
      </StyledBackground>
    );

  return (
    <StyledBackground>
      <Container>
        <Title>
          <Emoji symbol="👋" /> <div>Welcome back, {user.firstName}!</div>
        </Title>
        <Flex justify="space-between" marginTop="60px">
          <FlexItem width="300px" flex="initial">
            <UserInfo>
              <UserImage>
                {user.firstName[0]}
                {user.lastName[0]}
              </UserImage>
              {user && (
                <UserContent>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                </UserContent>
              )}
            </UserInfo>
            <UserProfileSidebar
              stage={sidebarStage}
              handleSidebarStage={handleSidebarStage}
            />
          </FlexItem>
          <FlexItem>{children}</FlexItem>
        </Flex>
      </Container>
    </StyledBackground>
  );
};

UserProfileLayout.propTypes = {
  children: PropTypes.node,
};
