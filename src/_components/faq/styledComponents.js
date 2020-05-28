import styled from 'styled-components';

import { deviceSize } from '_constants';

export const Container = styled.div`
@media (max-width: ${deviceSize.tablet}px) {
  width: 100%;
  padding: calc(50% * ${Math.tan(6)}) 10px;
  padding-bottom: 5%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin: 50px auto 10px auto;

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 36px;
  }
`;

export const Question = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin: 50px auto 20px auto;
`;

export const Answer = styled.div`
  text-align: left;
  flex-wrap: wrap;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;
