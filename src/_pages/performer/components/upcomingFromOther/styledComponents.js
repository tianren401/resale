import styled from 'styled-components';

import { deviceSize } from '_constants';

export const ComponentContainer = styled.div`
  width: 100%;
  transform: skewY(6deg);
  transform-origin: top left;
  background: linear-gradient(96.1deg, #455fe5 -14.65%, #9545e5 79.56%);
  padding: 50px;

  @media (max-width: ${deviceSize.tablet}px) {
    background: white;
    padding: 0;
  }
`;

export const CarouselTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  text-align: left;
  padding: 15px;
  color: white;

  @media (max-width: ${deviceSize.tablet}px) {
    color: black;
  }
`;

export const NoEventsFound = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 20px;
  color: white;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;
