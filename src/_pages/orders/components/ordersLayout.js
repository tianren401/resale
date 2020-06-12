import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Flex, FlexItem, H3 } from '_components';
import { colors, deviceSize } from '_constants';
import { OrdersSidebar } from './ordersSidebar';
import { setSidebarStage } from '_store/orders';
import { useViewport } from '_hooks';

import { StyledBackground, Container } from './styledComponents';

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
