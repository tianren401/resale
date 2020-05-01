import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TiledSection } from '_components';
import { deviceSize } from '_constants';

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px 0;
  max-width: 940px;

  @media (min-width: ${deviceSize.tablet}) {
    width: 100%;
    padding: 30px;
  }

  @media (min-width: ${deviceSize.laptop}) {
    width: 100%;
    padding: 30px 0;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: flex-end;
  color: #ebebeb;
  margin: 12px 16px;

  > span {
    margin-left: 5px;
    font-size: 14px;
    color: #6726f1;
  }

  @media (min-width: ${deviceSize.tablet}) {
    & {
      margin: 0px;
    }

    & > span {
      color: #fff;
    }
  }
`;

const EventTypeNavigation = styled.div`
  width: calc(100% - 32px);
  max-width: 650px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  margin: 0 16px 10px;
  display: flex;
  justify-content: space-between;

  & > div {
    padding: 12px 27px;
    border-radius: 100px;
  }

  @media (min-width: ${deviceSize.tablet}) {
    font-size: 19px;
    line-height: 32px;
    margin: 0 0px 10px;
    width: 100%;

    & > div {
      padding: 0;
      background: none;
      border-radius: 0;
    }
  }

  @media (min-width: ${deviceSize.laptop}) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const SelectedTypeBtn = styled.div`
  color: #ffffff;
  background: #6726f1;
  @media (min-width: ${deviceSize.tablet}) {
    border-bottom: 4px solid #ffffff;
  }
`;

const UnselectedTypeBtn = styled.div`
  color: #6726f1;
  background: #fff;
  cursor: pointer;
  @media (min-width: ${deviceSize.tablet}) {
    color: #d3bef7;
  }
`;

export const EventsGroup = ({ events, gutter, changeType, eventType }) => {
  return (
    <Container>
      <Title>
        Events near <span>Philadelphia, PA</span>
      </Title>
      <EventTypeNavigation>
        {eventType === 0 ? (
          <SelectedTypeBtn>Trending events</SelectedTypeBtn>
        ) : (
          <UnselectedTypeBtn onClick={() => changeType(0)}>Trending events</UnselectedTypeBtn>
        )}
        {eventType === 1 ? (
          <SelectedTypeBtn>Best Priced Tickets</SelectedTypeBtn>
        ) : (
          <UnselectedTypeBtn onClick={() => changeType(1)}>Best Priced Tickets</UnselectedTypeBtn>
        )}
        {eventType === 2 ? (
          <SelectedTypeBtn>Trending Artists</SelectedTypeBtn>
        ) : (
          <UnselectedTypeBtn onClick={() => changeType(2)}>Trending Artists</UnselectedTypeBtn>
        )}
      </EventTypeNavigation>
      <TiledSection events={events} gutter={gutter} />
    </Container>
  );
};

EventsGroup.propTypes = {
  events: PropTypes.array.isRequired,
  gutter: PropTypes.number,
  changeType: PropTypes.func,
  eventType: PropTypes.number,
};
