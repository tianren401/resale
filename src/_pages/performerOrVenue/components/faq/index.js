import React from 'react';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import { isMobileDevice } from '_helpers';

const Container = styled.div`
@media (max-width: ${deviceSize.tablet}px) {
  width: 100%;
  padding: calc(50% * ${Math.tan(6)}) 10px;
  padding-bottom: 5%;
`;

const Title = styled.div`
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

const Question = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin: 50px auto 20px auto;
`;

const Answer = styled.div`
  text-align: left;
  flex-wrap: wrap;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const Faq = () => {
  return (
    <Container>
      <Title>{isMobileDevice ? 'FAQ' : 'Frequently Asked Questions'}</Title>
      <Question>Is Billie Eilish Touring?</Question>
      <Answer>
        See above for all scheduled Billie Eilish concert dates and click
        {'favorite'} at the top of the page to get Billie Eilish tour updates
        and discover similar events.
      </Answer>
      <Question>How much are Billie Eilish tickets?</Question>
      <Answer>
        Billie Eilish tickets on the secondary market can vary depending on a
        number of factors. Typically, Billie Eilish tickets can be found for as
        low as $96.00, with an average price of $234.00.
      </Answer>
    </Container>
  );
};
