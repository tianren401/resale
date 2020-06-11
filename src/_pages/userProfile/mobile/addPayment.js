import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Icon, Loader, TextButton } from '_components';
import { colors, navigationHeight } from '_constants';

import { SavedCardDropin } from './savedCardDropin';

const StyledBackground = styled.div`
  width: 100%;
  height: calc(100vh - ${navigationHeight}px);
  padding: 0 20px 100px;
  position: relative;
`;

const BackButton = styled(TextButton)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  position: absolute;
  left: 14px;
  top: 18px;
`;

export const AddPayment = () => {
  const history = useHistory();
  const { loading } = useSelector((state) => state.checkoutReducer);

  const handleBack = () => {
    history.push('/user/mobile');
  };

  if (loading) return <Loader centered />;

  return (
    <StyledBackground>
      <BackButton onClick={handleBack}>
        <Icon name="leftArrow" size={24} color={colors.brand} />
        Back
      </BackButton>
      <SavedCardDropin method="add" />
    </StyledBackground>
  );
};
