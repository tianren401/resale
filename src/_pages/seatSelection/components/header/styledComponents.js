import styled from 'styled-components';

import { navigationHeight, deviceSize } from '_constants';

export const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  height: ${navigationHeight}px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 2;

  @media (max-width: ${deviceSize.mobileL}px) {
    align-items: flex-end;
    padding: 10px 20px;
  }
`;

export const EventTitle = styled.div`
  font-weight: bold;
  color: white;

  @media (max-width: ${deviceSize.mobileL}px) {
    font-size: 14px;
  }
`;

export const EventSubtitle = styled.div`
  display: flex;
  color: #f0f0f5;

  @media (max-width: ${deviceSize.mobileL}px) {
    font-size: 10px;
  }
`;

export const BackArrow = styled.img`
  position: absolute;
  align-self: flex-start;
  height: 24px;
  margin: auto 20px;

  @media (max-width: ${deviceSize.mobileL}px) {
    height: 16px;
    margin: auto 0;
  }
`;
