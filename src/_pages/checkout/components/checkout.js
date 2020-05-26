import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ProgressBar } from './progressBar';
import { TicketGroup } from './ticketGroup';

const Container = styled.div`
  width: 100%;
  min-height: 800px;
  position: relative;
  padding: 0 10%;
  margin-bottom: 50px;
`;

const TriangleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(94.83deg, #455fe5 11.04%, #8245e5 99.21%);
  clip-path: polygon(40% 0%, 100% 0%, 100% 100%);
  z-index: -1;
`;

const Content = styled.div`
  padding: 170px 5% 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Checkout = ({ children }) => {
  const { checkoutStage } = useSelector((state) => state.checkoutReducer);

  return (
    <Container>
      <TriangleOverlay />
      <ProgressBar stageIndex={checkoutStage} />
      <Content>
        {children}
        <TicketGroup />
      </Content>
    </Container>
  );
};

Checkout.propTypes = {
  children: PropTypes.node,
};
