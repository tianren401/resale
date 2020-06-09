import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { H4, Loader } from '_components';
import { colors } from '_constants';
import { getClientToken } from '_store/checkout';
import { BraintreeDropIn } from '../components';

const StyledPayments = styled.div`
  background: ${colors.white};
  min-height: 350px;
  position: relative;
  border: 2px solid rgba(103, 38, 241, 0.16);
  border-radius: 8px;
  padding: 40px;
`;

const Title = styled(H4)`
  margin-bottom: 40px;
`;

export const Payments = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.checkoutReducer);

  useEffect(() => {
    dispatch(
      getClientToken({
        success: () => {},
      })
    );
  }, [dispatch]);

  if (loading)
    return (
      <StyledPayments>
        <Loader centered />
      </StyledPayments>
    );

  return (
    <StyledPayments>
      <Title>Payment Settings</Title>
      <BraintreeDropIn />
    </StyledPayments>
  );
};
