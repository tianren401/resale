import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { deviceSize, colors } from '_constants';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TimeColumn = styled(FlexColumn)`
  width: 20%;
  align-self: center;
  text-align: left;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 30%;
    align-self: center;
  }
`;

const InfoColumn = styled(FlexColumn)`
  width: 50%;
  overflow: hidden;
  text-align: left;
`;

const MainInfo = styled.div`
  font-weight: 600;
  font-size: 19px;
  line-height: 24px;
  color: ${colors.black};
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ cardClicked }) => (cardClicked ? '#6726f1' : 'black')};

  @media (max-width: ${deviceSize.tablet}px) {
    text-overflow: initial;
    white-space: initial;
    overflow: initial;
    font-weight: 600;
    font-size: 10px;
    line-height: 16px;
    color: ${colors.black};

    &:hover {
      color: ${colors.brand};
    }
  }
`;

const ActionTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.brand};
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ cardClicked }) => (cardClicked ? '#6726f1' : colors.brand)};

  @media (max-width: ${deviceSize.tablet}px) {
    text-overflow: initial;
    white-space: initial;
    overflow: initial;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.brand};

    &:hover {
      color: ${colors.brand};
    }
  }
`;

const Detail = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #606060;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    color: ${colors.darkGray};
  }
`;

const StyledButton = styled(Link)`
  border-radius: 6px;
  color: {colors.black};
  width: 20%;
  padding: 10px;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    border: none;
    background: none;
    color: ${colors.brand};
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  margin: 10px auto;
  padding: 20px;
  flex-wrap: wrap;

  &:active {
    background: linear-gradient(
        0deg,
        rgba(103, 38, 241, 0.16),
        rgba(103, 38, 241, 0.16)
      ),
      #ffffff;
  }

  &:hover,
  &:active {
    box-shadow: 0px 7px 30px rgba(0, 0, 0, 0.25),
      0px 0px 4px rgba(91, 93, 99, 0.16), 0px 0px 2px rgba(130, 136, 148, 0.08);
    background: linear-gradient(
        0deg,
        rgba(103, 38, 241, 0.16),
        rgba(103, 38, 241, 0.16)
      ),
      #ffffff;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 0;
    width: 100%;

    &:hover,
    &:active {
      box-shadow: none;
      background: transparent;
      border-radius: 0;
    }
  }
`;

export const OrderCard = ({ order }) => {
  const {
    orderId,
    event: { event },
  } = order;
  const {
    venue: { name: venueName, state: venueState },
    name,
  } = event;
  const [cardClicked, setCardClicked] = useState(false);
  const timestamp = event.timestamp;
  const date = format(new Date(timestamp), 'MMMM do');
  const timeDate = format(new Date(timestamp), 'iii h:mm a');

  return (
    <Card
      onMouseDown={() => setCardClicked(true)}
      onMouseUp={() => setCardClicked(false)}
    >
      <TimeColumn>
        <MainInfo>{date}</MainInfo>
        <Detail>{timeDate}</Detail>
      </TimeColumn>
      <InfoColumn>
        <MainInfo cardClicked={cardClicked}>{name}</MainInfo>
        <Detail>
          {venueName} {venueState}
        </Detail>
      </InfoColumn>
      <StyledButton to={`../orders/${orderId}`}>
        <ActionTitle>View Details</ActionTitle>
        <Detail>ID: {orderId}</Detail>
      </StyledButton>
    </Card>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object,
};
