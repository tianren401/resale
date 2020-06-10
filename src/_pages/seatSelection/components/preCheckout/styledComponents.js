import { Button, Dropdown } from '_components';
import styled from 'styled-components';
import { deviceSize, colors } from '_constants';

export const PreCheckoutContainer = styled.div`
  position: absolute;
  background: white;
  top: 0px;
  left: 0px;
  width: 0%;
  height: 100%;
  overflow: hidden;
  transition: 0.2s;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.15);
  z-index: 4;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    position: fixed;
    padding-top: 80px;
    top: 0px;
    left: 0px;
    height: 110%;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    width: 100%;
    `};
`;

export const PreCheckoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 120%;
  padding: 0 calc((100% - 280px) / 2);
  overflow: hidden;
`;

export const StyledPreCheckoutHeader = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    position: absolute;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    top: 0;
    left: 0;
    margin: 0;
    height: 60px;
    width: 100%;
    padding: 0px 10px;
    background: linear-gradient(108.73deg, #455fe5 -14.65%, #9545e5 79.56%);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const BackButton = styled(Button)`
  color: ${colors.brand};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 55px;
  font-size: 16px;
  margin: 20px 0 50px 0;
  background: none;
  padding: 0;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    color: ${colors.white};
    display: flex;
    height: 100%;
    margin: auto 0;
    padding: 0;
  }
`;

export const TicketTitle = styled.h2`
  font-weight: bold;
  width: 280px;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    color: ${colors.white};
    align-self: flex-end;
    text-align: right;
    font-size: 16px;
  }
`;

export const TicketSubTitle = styled.div`
  color: #8d8d94;
  width: 280px;
  margin-bottom: 24px;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    color: #f0f0f5;
    align-self: flex-end;
    text-align: right;
    font-size: 10px;
    margin: 0;
  }
`;

export const SeatImage = styled.img`
  height: 206px;
  width: 280px;
  margin-bottom: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);

  @media (max-width: ${deviceSize.tablet - 1}px) {
    height: 180px;
    margin-bottom: 15px;
  }
`;

export const Price = styled.div`
  color: #3dcc79;
  font-size: 18px;
  width: 280px;
  margin-bottom: 16px;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    font-size: 24px;
    margin-bottom: 0px;
  }
`;

export const CheckoutQuanityDropdown = styled(Dropdown)`
  @media (max-width: ${deviceSize.tablet - 1}px) {
    order: 2;
    margin-top: 20px;
  }
`;

export const CheckoutTag = styled.div`
  display: flex;
  flex-direction: row;
  color: #8d8d94;
  width: 280px;
  margin-top: 16px;
  align-items: center;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    height: 30px;
  }
`;

export const TagImage = styled.img`
  position: relative;
  margin-right: 10px;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    height: 30px;
    width: 30px;
  }
`;

export const CheckoutButton = styled.button`
  height: 48px;
  width: 280px;
  margin-top: 32px;
  background-color: #6726f1;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;

  @media (max-width: ${deviceSize.tablet - 1}px) {
    order: 3;
    margin-top: 20px;
  }
`;

export const CheckoutFailedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  color: #8d8d94;
  font-weight: 600;
`;

export const StyledTextDiv = styled.div`
  color: #8d8d94;
  postion: fixed;
  margin: 5px;
  text-align: center;
  font-weight: ${(props) => props.fontWeight || 'normal'};
`;

export const AlertImage = styled.img`
  margin: 10px;
`;
