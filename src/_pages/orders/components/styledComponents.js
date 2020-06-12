import styled from 'styled-components';

import { deviceSize } from '_constants';
import userProfileBackground from '_images/userProfileBackground.png';

export const StyledBackground = styled.div`
  width: 100%;
  min-height: 840px;
  background-image: ${`url(${userProfileBackground})`},
    linear-gradient(
      0deg,
      rgba(86, 40, 218, 0.45) -100%,
      rgba(255, 255, 255, 1) 60%
    );
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%, 100% 100%;
  background-position: center, center;
  padding: 50px 100px;
  background-blend-mode: screen;
  height: calc(100vh - 60px);

  @media (max-width: ${deviceSize.tablet}px) {
    background: white;
    padding: 0;
    min-height: auto;
  }
`;

export const StyledDetailsBackground = styled.div`
  width: 100%;
  min-height: 840px;
  padding: 0;
  background-color: white;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 0;
    min-height: auto;
  }
`;

export const StyledDetailsHeader = styled.div`
  width: 100%;
  height: 340px;
  background-image: linear-gradient(
      99.55deg,
      rgba(69, 95, 229, 0.3) -15.67%,
      rgba(149, 69, 229, 0.3) 80.32%
    ),
    ${(props) => props.backgroundImage};
  background-repeat: no-repeat, no-repeat;
  background-size cover;
  background-position: center, center;
  background-blend-mode: screen;
  background-blend-mode: normal, multiply;
  box-shadow: inset 0px -10px 40px rgba(0, 0, 0, 0.25);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 38%);

  @media (max-width: ${deviceSize.tablet}px) {
    height: 172px;
    padding: 0;
    min-height: auto;
  }
`;

export const Container = styled.div`
  max-width: 980px;
  margin: auto;
`;

export const TicketDetailsContainer = styled.div`
  max-width: 680px;
  margin: auto;
  padding-bottom: 110px;
  @media (max-width: ${deviceSize.tablet}px) {
    padding: 20px;
    width: 100%:
  }
`;
