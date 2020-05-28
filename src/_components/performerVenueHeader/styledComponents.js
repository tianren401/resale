import styled from 'styled-components';

import { deviceSize } from '_constants';

export const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50vh;
  background-color: #a9a9a9;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  background-position-x: center;
  background-position-y: center;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 100px 100px 75px 200px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 30px 10px;
  }
`;

export const AttractionName = styled.div`
  font-weight: bold;
  font-size: 38px;
  line-height: 46px;
  color: white;
  padding: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
    width: 100%;
    text-align: left;
  }
`;

export const Subtitle = styled.div`
  color: white;
  font-size: 14px;
  padding: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
    line-height: 22px;
  }
`;

export const Address = styled.div`
  color: white;
  font-size: 16px;
  padding: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
    line-height: 24px;
  }
`;
