import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { H4, H5, Loader, OrderCard, FlexItem, Flex, Icon } from '_components';
import { colors, deviceSize } from '_constants';
import { getUserOrdersAction } from '_store/orders';
import { useViewport } from '_hooks';
import { authService } from '_services';
import { OrdersLayout } from './ordersLayout';

const StyledOrderContainer = styled.div`
  background: ${colors.white};
  border: 2px solid rgba(103, 38, 241, 0.16);
  border-radius: 8px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: ${deviceSize.tablet}px) {
    border: none;
    padding: 20px;
    background: white;
  }
`;

const EmptyTitle = styled(H5)`
  align-self: center;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.darkGray};
  text-align: center;
`;

const Title = styled(H4)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    border-bottom: 1px solid #e6e6eb;
    padding-bottom: 8px;
    margin-bottom: 0;

    &:nth-child(odd) {
      margin-top: 40px;
    }
  }
`;

const Content = styled.div`
  margin-top: 40px;

  @media (max-width: ${deviceSize.tablet}px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 120px;
    margin-top: 0;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  border: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 1px;
  transition: width 0.3s;
  padding-left: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${colors.brand};

  &:focus {
    width: 100%;
    outline: none;
  }

  &::placeholder {
    color: ${colors.lightGray};
  }
`;

const IconContainer = styled.div`
  padding-left: 0;
  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  align-self: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  padding: 9px 12px 9px 14px;
  width: 181px;
  align-self: flex-end;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(130, 136, 148, 0.16);
    border: 1px solid ${colors.brand};
    color: ${colors.brand};

    svg {
      path {
        fill: ${colors.brand};
      }
    }
  }

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const SearchIcon = <Icon size={24} color={colors.gray} name="search" />;

export const AllOrders = () => {
  const windowSize = useViewport();
  const dispatch = useDispatch();

  const isMobileDevice = windowSize.width < deviceSize.tablet;

  const [query, setQuery] = useState('');

  const { loading } = useSelector((state) => state.userProfileReducer);
  const { upcomingOrders, pastOrders, sidebarStage } = useSelector(
    (state) => state.ordersReducer
  );

  const user = authService.getAuthFromStorage()?.user;
  const { email: userEmail } = user;
  const handleFetchOrders = useCallback(() => {
    dispatch(getUserOrdersAction(userEmail));
  }, [dispatch, userEmail]);

  useEffect(() => {
    handleFetchOrders();
  }, [handleFetchOrders]);

  let orders = sidebarStage === 1 ? pastOrders : upcomingOrders;

  if (query !== '') {
    const regexp = new RegExp(query, 'i');
    orders = orders.filter((order) => {
      const {
        event: { event },
      } = order;
      const {
        venue: { name: venueName },
        name,
      } = event;

      return name.match(regexp) || venueName.match(regexp);
    });
  }

  const title = sidebarStage === 1 ? 'Past Events' : 'My Tickets';
  if (loading)
    return (
      <StyledOrderContainer>
        <Loader centered />
      </StyledOrderContainer>
    );

  return (
    <OrdersLayout>
      <StyledOrderContainer>
        {!isMobileDevice ? (
          <>
            <Flex width="100%" justify="space-between">
              <FlexItem flex="1">
                <Title>{title}</Title>
              </FlexItem>
              <FlexItem flex="0">
                <SearchInputContainer>
                  <IconContainer>{SearchIcon}</IconContainer>
                  <SearchInput
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder="Search"
                  />
                </SearchInputContainer>
              </FlexItem>
            </Flex>
            <Content>
              {orders.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
              {orders.length === 0 && (
                <EmptyTitle>Your tickets will appear here</EmptyTitle>
              )}
            </Content>
          </>
        ) : (
          <>
            <Title>My Tickets</Title>
            <Content>
              {upcomingOrders.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
              {upcomingOrders.length === 0 && (
                <EmptyTitle>Your tickets will appear here</EmptyTitle>
              )}
            </Content>

            <Title>Past Events</Title>
            <Content>
              {pastOrders.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
              {pastOrders.length === 0 && (
                <EmptyTitle>Your tickets will appear here</EmptyTitle>
              )}
            </Content>
          </>
        )}
      </StyledOrderContainer>
    </OrdersLayout>
  );
};
