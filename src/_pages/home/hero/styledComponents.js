import styled from 'styled-components';

import { deviceSize } from '_constants';
import { PrimaryButton } from '_components/button';

export const StyledCarouselIndicatorContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 10%;

  @media (min-width: ${deviceSize.tablet}px) {
    bottom: 27%;
  }
`;

export const StyledCarouselIndicator = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${({ active }) =>
    active ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.24)'};
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  cursor: pointer;

  &:active {
    background-color: white;
  }
`;

export const LeftArrow = styled.img`
  position: absolute;
  top: 45%;
  left: 2%;
  cursor: pointer;
  opacity: 0.6;

  @media (min-width: ${deviceSize.tablet}px) {
    top: 40%;
    left: 15%;
  }
`;

export const RightArrow = styled.img`
  position: absolute;
  top: 45%;
  right: 2%;
  cursor: pointer;
  opacity: 0.6;

  @media (min-width: ${deviceSize.tablet}px) {
    top: 40%;
    right: 15%;
  }
`;

export const Container = styled.div`
  position: relative;
  height: 50%;
  max-height: 420px;

  @media (min-width: ${deviceSize.tablet}px) {
    height: 70%;
    min-height: 800px;
  }

  @media screen and (max-width: ${deviceSize.tablet}px) {
    height: 50%;
    max-height: 420px;
  }

  .rec-carousel {
    @media screen and (max-width: ${deviceSize.tablet}px) {
      max-height: 420px;
    }
  }
`;

export const StyledCarouselItem = styled.div`
  width: 100%;
  height: 100%;
  min-height: 420px;
  padding: 0 5%;
  align-items: center;
  color: #fff;
  font-size: 4em;
  position: relative;

  @media (min-width: ${deviceSize.tablet}px) {
    min-height: 800px;
    padding: 0 20%;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    min-height: 420px;
    padding: 0 30px;
  }
`;

export const EventBackground = styled.div`
  z-index: -2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      179.2deg,
      rgba(130, 69, 229, 0.32) 10.71%,
      rgba(0, 0, 0, 0.59) 109.25%
    ),
    url(${({ backgroundImage }) => backgroundImage});
`;

export const EventInfo = styled.div`
  width: 95%;
  position: absolute;
  bottom: 60px;
  z-index: 0;

  @media (min-width: ${deviceSize.tablet}px) {
    width: 65%;
    top: calc(40% - 10px);
    z-index: 0;
  }
`;

export const Artist = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;

  @media (min-width: ${deviceSize.tablet}px) {
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
  }
`;

export const BuyTicketBtn = styled.div`
  color: #c4a2fa;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    color: #8049f3;
  }

  @media (min-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

export const EventLocation = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding: 0;

  @media (min-width: ${deviceSize.tablet}px) {
    font-size: 18px;
    line-height: 24px;
    padding: 12px 0;
  }
`;

export const StyledButton = styled(PrimaryButton)`
  line-height: 20px;
  margin-top: 32px;
  display: none;

  @media (min-width: ${deviceSize.tablet}px) {
    display: block;
  }
`;
