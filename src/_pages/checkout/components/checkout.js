import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ProgressBar } from './progressBar';
import { TicketGroup } from './ticketGroup';
import { deviceSize, colors } from '_constants';

const StyledCheckout = styled.div`
  width: 100%;
  min-height: 800px;
  position: relative;
  padding: 0 10%;
  margin-bottom: 50px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 0;
    margin: 0;
    background: ${(props) => props.stageIndex !== 2 && colors.mLightGray};
    min-height: 100%;
  }
`;

const TriangleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(94.83deg, #455fe5 11.04%, #8245e5 99.21%);
  clip-path: polygon(40% 0%, 100% 0%, 100% 100%);
  z-index: 1;

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const PlaceOrderMobileOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 170px;
  background: linear-gradient(98.38deg, #455fe5 11.04%, #8245e5 99.21%);
  z-index: -1;

  @media (min-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const Container = styled.div`
  max-width: 980px;
  margin: auto;
  padding-top: 170px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: ${deviceSize.tablet}px) {
    flex-direction: column-reverse;
    justify-content: space-around;
    padding: 0;
  }
`;

export const Checkout = ({ children }) => {
  const { checkoutStage } = useSelector((state) => state.checkoutReducer);

  return (
    <StyledCheckout stageIndex={checkoutStage}>
      <TriangleOverlay />
      {checkoutStage === 2 && <PlaceOrderMobileOverlay />}
      <ProgressBar stageIndex={checkoutStage} />
      <Container>
        {children}
        <TicketGroup stageIndex={checkoutStage} />
      </Container>
    </StyledCheckout>
  );
};

Checkout.propTypes = {
  children: PropTypes.node,
};
