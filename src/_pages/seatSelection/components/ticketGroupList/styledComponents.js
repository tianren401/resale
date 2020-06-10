import styled from 'styled-components';

import { PrimaryButton } from '_components';

export const StyledTicketGroupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const StyledTicketGroupList = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  overflow: auto;
`;

export const StyledTicketListSection = styled.div`
  width: 100%;
`;

export const StyledTicketListSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0f0f5;
  height: 48px;
  font-size: 12px;
  font-weight: 600;
  background: #e6e6eb;
  color: #8d8d94;
`;

export const VFSImageContainer = styled.div`
  height: 162px;
  width: 280px;
  margin: 30px 20px;
`;

export const VFSImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;

export const VFSImageMessage = styled.p`
  position: absolute;
  top: 81px;
  height: 81px;
  width: 280px;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #8d8d94;
`;

export const StyledTicketGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f5;
  height: 72px;
  color: #272729;

  ${({ isOnMap }) =>
    !isOnMap &&
    `
    background: #F0F0F5;
    border: 1px solid #E6E6EB;
  `};
`;

export const TicketInformation = styled.div`
  width: 200px;
  align-content: center;
`;

export const TicketSectionRow = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

export const TicketQuantity = styled.p`
  font-size: 12px;
  color: #757575;
`;

export const NoTicketsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #8d8d94;
  font-weight: 600;
  border: 1px solid #e6e6eb;
`;

export const StyledTextDiv = styled.div`
  color: #8d8d94;
  postion: fixed;
  margin: 5px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
`;

export const TicketPriceButton = styled(PrimaryButton)``;
