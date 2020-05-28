import React from 'react';

import { isMobileDevice } from '_helpers';
import { LoadMoreButton } from '_components';
import { Container, Title, Question, Answer } from './styledComponents';

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
      {isMobileDevice && <LoadMoreButton />}
    </Container>
  );
};
