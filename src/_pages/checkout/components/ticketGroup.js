import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { colors, shadows } from '_constants';
import { H4, H5, H6, TextButton, ContentImage } from '_components';
import ticketProtectIcon from '_images/ticketProtectIcon.svg';
import ticketGroupBackground from '_images/ticketGroupBackground.png';

const Container = styled.div`
  width: 280px;
  border-radius: 8px;
  background-image: ${`url(${ticketGroupBackground})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: ${shadows.medium};
  margin-left: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TicketName = styled(H4)`
  background: linear-gradient(116.95deg, #455fe5 11.04%, #8245e5 99.21%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 4px 0;
`;

const VFS = styled.div`
  width: 100%;
  height: 194px;
  margin: 16px 0;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => props.image};
`;

const PriceDiv = styled.div`
  margin-top: ${(props) => props.marginTop || '8px'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BorderLine = styled.div`
  margin: 24px 0;
  width: 100%;
  border: 1px solid ${colors.lightGray};
`;

const ProtectionGroup = styled.div`
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > span {
    vertical-align: middle;
    margin-left: 8px;
  }

  & > img {
    background: ${colors.lightSuccess};
    padding: 6px;
    border-radius: 50%;
  }
`;

const ProtectionDescription = styled.div`
  width: 100%;
  margin: 8px 0 12px;
  text-align: left;
`;

const Link = styled(TextButton)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`;

export const TicketGroup = () => {
  const {
    vfsURL,
    event,
    ticketGroupPrice,
    ticketGroupQuantity,
    ticketGroupSection,
    ticketGroupRow,
  } = useSelector((state) => state.checkoutTicketReducer);

  const date = format(new Date(event.date), "EEEE MMM do 'at' h:mma");
  return (
    <Container>
      <TicketName>{event.name}</TicketName>
      <H6 marginTop="4px" color={colors.black1}>
        {date}
      </H6>
      <H6 marginTop="4px" color={colors.black1}>
        {event.city}, {event?.stateProvince} · {event.venue}
      </H6>
      <H6 marginTop="4px" color={colors.darkGray}>
        Section {ticketGroupSection}, Row {ticketGroupRow}
      </H6>
      {!!vfsURL && <VFS image={`url(${vfsURL})`} />}
      <PriceDiv>
        <H6>Price per ticket</H6>
        <H6>${ticketGroupPrice}</H6>
      </PriceDiv>
      <PriceDiv>
        <H6>Quantity</H6>
        <H6>x{ticketGroupQuantity}</H6>
      </PriceDiv>
      <PriceDiv>
        <H6>Taxes {`\u0026`} Fees</H6>
        <H6>$1</H6>
      </PriceDiv>
      <PriceDiv marginTop="16px">
        <H5 weight="600" color={colors.brand}>
          Total
        </H5>
        <H5 weight="600" color={colors.brand}>
          ${ticketGroupPrice * ticketGroupQuantity + 1}
        </H5>
      </PriceDiv>
      <BorderLine />
      <ProtectionGroup>
        <ContentImage src={ticketProtectIcon} />
        <span>Ticket Protection Guaranteed</span>
      </ProtectionGroup>
      <ProtectionDescription>
        <H6 color={colors.darkGray}>
          You’re 100% covered by the SelectSeats {`Buyer's`} Guarantee. We
          guarantee you’ll get the tickets you ordered on time.
        </H6>
        <Link>Learn more →</Link>
      </ProtectionDescription>
    </Container>
  );
};
