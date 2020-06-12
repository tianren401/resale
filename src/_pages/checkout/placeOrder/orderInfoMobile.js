import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { colors, shadows, cardLogos } from '_constants';
import {
  H4,
  H5,
  H6,
  TextButton,
  ContentImage,
  SuccessButton,
  Loader,
} from '_components';
import ticketProtectIcon from '_images/ticketProtectIcon.svg';
import ticketGroupBackground from '_images/ticketGroupBackground.png';
import { purchasePayment } from '_store/checkout';
import { clearLockRequestId } from '_store/checkoutTicket';
import mail from '_images/mail.svg';

const StyledOrderInfoMobile = styled.div`
  padding: 20px;
`;

const Container = styled.div`
  width: 100%;
  border-radius: 8px 8px 0 0;
  background-image: ${`url(${ticketGroupBackground})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: ${shadows.medium};
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const TicketName = styled(H4)`
  background: linear-gradient(116.95deg, #455fe5 11.04%, #8245e5 99.21%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 4px 0;
`;

const TicketContent = styled(H6)`
  margin-top: 4px;
  color: ${(props) => props.color || colors.black1};
`;

const VFS = styled.div`
  width: 100%;
  height: 136px;
  margin: 16px 0;
  border-radius: 8px;
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
  width: 100%;
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

const LearnLink = styled(TextButton)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`;

const TicketInfo = styled.div`
  display: inline-block;
`;

const Info = styled.div`
  width: 100%;
  padding: 16px 0 8px;
  text-align: left;
`;

const Delivery = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const DeliveryInfo = styled.div`
  font-size: 14px;
  line-height: 22px;
`;

const PaymentInfo = styled.div`
  margin-top: 32px;
`;

const UserImage = styled.div`
  min-width: 50px;
  border-radius: 50%;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  padding: 9px 0;
  background: ${colors.brand};
  color: ${colors.white};
`;

const TicketDelivery = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

const MailImage = styled(ContentImage)`
  background: ${colors.lightBrand};
  padding: 6px;
  border-radius: 50%;
  margin-right: 12px;
`;

const StyledSuccessButton = styled(SuccessButton)`
  border-radius: 0px 0px 8px 8px;
`;

const GuaranteeDesc = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${colors.darkGray};
`;

export const OrderInfoMobile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    deliveryInfo,
    nonce,
    loading,
    paymentMethod,
    saveCardInfo,
  } = useSelector((state) => state.checkoutReducer);
  const { user } = useSelector((state) => state.authReducer);
  const {
    vfsURL,
    ticketGroupId,
    ticketGroupQuantity,
    ticketGroupPrice,
    lockRequestId,
    deliveryTypeId,
    deliveryTypeName,
    event,
    ticketGroupSection,
    ticketGroupRow,
  } = useSelector((state) => state.checkoutTicketReducer);

  const date = format(new Date(event.date), "EEEE MMM do 'at' h:mma");

  const placeOrder = () => {
    if (!deliveryInfo) return;

    const orderRequest = {
      userName: deliveryInfo.name,
      userEmail: deliveryInfo.email,
      userPhone: deliveryInfo.phoneNumber,
      eventId: event.id,
      ticketGroupId,
      quantity: ticketGroupQuantity,
      lockRequestId,
      unitPrice: ticketGroupPrice,
      deliveryTypeId,
      deliveryTypeName,
      paymentMethodNonce: nonce,
      saveCardInfo,
    };

    dispatch(
      purchasePayment({
        request: orderRequest,
        success: () => {
          dispatch(clearLockRequestId());
          history.push('/checkout/confirmation');
        },
      })
    );
  };

  if (loading)
    return (
      <Container>
        <Loader centered />
      </Container>
    );

  return (
    <StyledOrderInfoMobile>
      <Container>
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
        {!!vfsURL && <VFS image={`url(${vfsURL})`} />}
        <Info>
          <div>
            <H5 weight="600">Delivery Information</H5>
            <Delivery>
              <UserImage>
                {user ? user.firstName[0] + user.lastName[0] : 'G'}
              </UserImage>
              {deliveryInfo ? (
                <DeliveryInfo>
                  <p>{deliveryInfo.name}</p>
                  <p>{deliveryInfo.phoneNumber}</p>
                  <p>{deliveryInfo.email}</p>
                </DeliveryInfo>
              ) : (
                <></>
              )}
            </Delivery>
          </div>
          <PaymentInfo>
            <H5 weight="600">Payment Information</H5>
            <H5 lineHeight="22px" marginTop="8px">
              <ContentImage src={cardLogos[paymentMethod.type]} height="22" />{' '}
              {paymentMethod.type} ending in {paymentMethod.lastFour}{' '}
            </H5>
          </PaymentInfo>
        </Info>
        <BorderLine />
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
        <TicketDelivery>
          <MailImage src={mail} />
          {deliveryInfo ? (
            <H5 weight="normal">
              E-tickets will be sent to {deliveryInfo.email}
            </H5>
          ) : (
            <></>
          )}
        </TicketDelivery>
        <ProtectionGroup>
          <ContentImage src={ticketProtectIcon} />
          <span>Ticket Protection Guaranteed</span>
        </ProtectionGroup>
        <ProtectionDescription>
          <H6 color={colors.darkGray}>
            You’re 100% covered by the SelectSeats {`Buyer's`} Guarantee. We
            guarantee you’ll get the tickets you ordered on time.
          </H6>
          <LearnLink>Learn more →</LearnLink>
        </ProtectionDescription>
      </Container>
      <StyledSuccessButton minWidth="100%" fontSize="14px" onClick={placeOrder}>
        Place Order
      </StyledSuccessButton>
      <GuaranteeDesc>
        All confirmed purhcases are 100% guaranteed.
      </GuaranteeDesc>
    </StyledOrderInfoMobile>
  );
};
