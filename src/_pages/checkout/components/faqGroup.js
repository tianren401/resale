import React from 'react';
import styled from 'styled-components';

import { H4, H5 } from '_components';
import { colors } from '_constants';

const Container = styled.div`
  width: 100%;
  padding: 60px 30%;
  background: ${colors.mLightGray};
`;

const Content = styled(H5)`
  margin-bottom: 20px;
  font-weight: 400;
`;

const Title = styled(H5)`
  font-weight: 600;
  margin: 20px 0;
`;

export const FAQGroup = () => {
  return (
    <Container>
      <H4 weight="bold">FAQs</H4>
      <Title>Is Billie Eilish touring?</Title>
      <Content>
        See above for all scheduled Billie Eilish concert dates and click
        {`"favorite"`} at the top of the page to get Billie Eilish tour updates
        and discover similar events.
      </Content>
      <Title>How much are Billie Eilish tickets?</Title>
      <Content>
        Billie Eilish tickets on the secondary market can vary depending on a
        number of factors. Typically, Billie Eilish tickets can be found for as
        low as $96.00, with an average price of $234.00.
      </Content>
      <Title>How much are Billie Eilish tickets?</Title>
      <Content>
        Billie Eilish tickets on the secondary market can vary depending on a
        number of factors. Typically, Billie Eilish tickets can be found for as
        low as $96.00, with an average price of $234.00.
      </Content>
      <Title>How to get cheap Billie Eilish tickets?</Title>
      <Content>
        If you’re looking for cheap Billie Eilish tickets, tickets can be found
        for as low as $96.00. Additionally, once you click on your preferred
        event date, use the “sort by price” button located in the top left hand
        corner of the event page to sort all available Billie Eilish tickets by
        cheapest tickets available.
      </Content>
      <Title>How long are Billie Eilish concerts?</Title>
      <Content>
        Most concerts last about 2-3 hours but can run shorter or longer
        depending on the artist, opening acts, encore, etc. Billie Eilish
        concerts typically last 1.25 hours.
      </Content>
      <Title>{`What's Billie Eilish's setlist?`}</Title>
      <Content>
        While performances can vary between venues, Billie Eilish setlist will
        likely include the following songs:
      </Content>
      <Content>bad guy</Content>
      <Content>my strange addiction</Content>
      <Content>you should see me in a crown</Content>
      <Content>COPYCAT</Content>
      <Content>WHEN I WAS OLDER</Content>
    </Container>
  );
};
