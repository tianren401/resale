import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { colors, deviceSize, shadows } from '_constants';
import { H4, H5, H6, TextButton, ContentImage } from '_components';
import ticketProtectIcon from '_images/ticketProtectIcon.svg';
import ticketGroupBackground from '_images/ticketGroupBackground.png';
import { TicketModal } from './ticketModal';
import { isMobileDevice } from '_helpers';

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
  align-items: center;
  z-index: 2;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    margin: 0px;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 16px 20px;
    z-index: 0;
    ${(props) => props.stageIndex === 2 && `display: none`}
  }
`;

const TicketName = styled(H4)`
  background: linear-gradient(116.95deg, #455fe5 11.04%, #8245e5 99.21%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 4px 0;

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 14px;
    line-height: 20px;
    -webkit-text-fill-color: ${colors.black2};
    background: none;
    margin: 0;
  }
`;

const TicketContent = styled(H6)`
  margin-top: 4px;
  color: ${(props) => props.color || colors.black1};

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 12px;
    line-height: 18px;
    color: ${(props) => props.color || colors.black2};
    margin: 0;
  }
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

  @media (max-width: ${deviceSize.tablet}px) {
    width: 86px;
    height: 74px;
    border: 1px solid ${colors.lightGray};
    border-radius: 8px;
    margin: 0;
  }
`;

const PriceDiv = styled.div`
  margin-top: ${(props) => props.marginTop || '8px'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const BorderLine = styled.div`
  margin: 24px 0;
  width: 100%;
  border: 1px solid ${colors.lightGray};

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
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

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const ProtectionDescription = styled.div`
  width: 100%;
  margin: 8px 0 12px;
  text-align: left;

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const Link = styled(TextButton)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`;

const TicketInfo = styled.div`
  display: inline-block;
`;

export const TicketGroup = ({ stageIndex }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    vfsURL,
    event,
    ticketGroupPrice,
    ticketGroupQuantity,
    ticketGroupSection,
    ticketGroupRow,
  } = useSelector((state) => state.checkoutTicketReducer);
  const handleModalOpen = () => isMobileDevice && setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const date = format(new Date(event.date), "EEEE MMM do 'at' h:mma");
  return (
    <Container stageIndex={stageIndex}>
      <TicketInfo>
        <TicketName>{event.name}</TicketName>
        <TicketContent>{date}</TicketContent>
        <TicketContent>
          {event.city}, {event?.stateProvince} · {event.venue}
        </TicketContent>
        <TicketContent color={colors.darkGray}>
          Section {ticketGroupSection}, Row {ticketGroupRow}
        </TicketContent>
      </TicketInfo>
      {!!vfsURL && <VFS image={`url(${vfsURL})`} onClick={handleModalOpen} />}
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
      <TicketModal isOpenModal={isOpenModal} closeModal={closeModal} />
    </Container>
  );
};

TicketGroup.propTypes = {
  stageIndex: PropTypes.number,
};
