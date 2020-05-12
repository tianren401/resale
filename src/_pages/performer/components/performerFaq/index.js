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

const LoadMoreButton = styled.button`
  border: 1px solid #9c9c9c;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #9c9c9c;
  padding: 5px 10px;
  margin: 15px auto 50px auto;
  display: none;

  @media (max-width: ${deviceSize.tablet}px) {
    background-color: white;
    display: block;
  }
`;

export const PerformerFaq = () => {
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
      <LoadMoreButton>Load More</LoadMoreButton>
    </Container>
  );
};
