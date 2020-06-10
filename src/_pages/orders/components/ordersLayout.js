import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Flex, FlexItem, H3 } from '_components';
import { colors, deviceSize } from '_constants';
import userProfileBackground from '_images/userProfileBackground.png';
import { OrdersSidebar } from './ordersSidebar';
import { setSidebarStage } from '_store/orders';
import { useViewport } from '_hooks';

const StyledBackground = styled.div`
  width: 100%;
  min-height: 840px;
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

  @media (max-width: ${deviceSize.tablet}px) {
    background: white;
    padding: 0;
    min-height: auto;
  }
`;

const Container = styled.div`
  max-width: 980px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 60px;
  @media (max-width: ${deviceSize.tablet}px) {
    height: 147px;
    justify-content: center;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 64%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 64%);
    background: linear-gradient(95.18deg, #455fe5 11.43%, #8245e5 102.7%);
    margin-bottom: 0;
  }
`;

const Title = styled(H3)`
  > div {
    display: inline-block;
    background: ${colors.gradientVioletBlue};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 42px;

    @media (max-width: ${deviceSize.tablet}px) {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: white;
      background: transparent;
      -webkit-text-fill-color: white;
    }
  }
`;

export const OrdersLayout = ({ children }) => {
  const windowSize = useViewport();
  const isMobileDevice = windowSize.width < deviceSize.tablet;

  const dispatch = useDispatch();
  const history = useHistory();
  const { sidebarStage } = useSelector((state) => state.ordersReducer);

  useEffect(() => {
    return () => {
      dispatch(setSidebarStage(0));
    };
  }, [dispatch]);

  const handleSidebarStage = (index, url) => {
    dispatch(setSidebarStage(index));
    history.push(url);
  };

  return (
    <StyledBackground>
      <Container>
        <Header>
          <Title>
            <div>Tickets</div>
          </Title>
        </Header>

        <Flex justify="space-between">
          {!isMobileDevice ? (
            <>
              <FlexItem width="300px" flex="initial">
                <OrdersSidebar
                  stage={sidebarStage}
                  handleSidebarStage={handleSidebarStage}
                />
              </FlexItem>
              <FlexItem>{children}</FlexItem>
            </>
          ) : (
            <>
              <FlexItem>{children}</FlexItem>
            </>
          )}
        </Flex>
      </Container>
    </StyledBackground>
  );
};

OrdersLayout.propTypes = {
  children: PropTypes.node,
};
