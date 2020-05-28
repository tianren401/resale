import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  H2,
  H5,
  TextButton,
  ContentImage,
  SuccessButton,
  Loader,
} from '_components';
import { purchasePayment } from '_store/checkout';
import { clearLockRequestId } from '_store/checkoutTicket';
import { colors, cardLogos } from '_constants';
import mail from '_images/mail.svg';
import userFace from '_images/mocks/checkoutFace.png';

const Container = styled.div`
  width: 60%;
  max-width: 480px;
  position: relative;
`;

const Info = styled.div`
  width: 100%;
  margin-top: 32px;
  padding: 20px 25px;
  border: 2px solid ${colors.lightBrand};
  border-radius: 8px;
`;

const Delivery = styled.div`
  display: flex;
  flex-direction: row;
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

const Link = styled(TextButton)`
  font-size: 12px;
  font-weight: 400;
  padding-left: 15px;
`;

const UserImage = styled.div`
  width: 87px;
  height: 87px;
  border-radius: 50%;
  margin-right: 20px;
  background-image: url(${userFace});
`;

const TicketDelivery = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 20px 25px;
  border: 2px solid ${colors.lightBrand};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MailImage = styled(ContentImage)`
  background: ${colors.lightBrand};
  padding: 6px;
  border-radius: 50%;
  margin-right: 12px;
`;

const GuaranteeDesc = styled.div`
  margin-top: 20px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${colors.darkGray};
`;

export const OrderInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    deliveryInfo,
    nonce,
    loading,
    paymentMethod,
    saveCardInfo,
  } = useSelector((state) => state.checkoutReducer);

  const {
    ticketGroupId,
    ticketGroupQuantity,
    ticketGroupPrice,
    lockRequestId,
    deliveryTypeId,
    deliveryTypeName,
    event,
  } = useSelector((state) => state.checkoutTicketReducer);

  const moveTo = (link) => {
    history.push('/checkout' + link);
  };

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
    <Container>
      <H2 weight="500">Place Order</H2>
      <Info>
        <div>
          <H5 weight="600">
            Delivery Information
            <Link onClick={() => moveTo('/delivery')}>Edit Info</Link>
          </H5>
          <Delivery>
            <UserImage />
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
          <H5 weight="600">
            Payment Information
            <Link onClick={() => moveTo('/billing')}>Edit Payment</Link>
          </H5>
          <H5 lineHeight="22px" marginTop="8px">
            <ContentImage src={cardLogos[paymentMethod.type]} height="22" />{' '}
            {paymentMethod.type} ending in {paymentMethod.lastFour}{' '}
          </H5>
        </PaymentInfo>
      </Info>
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
      <SuccessButton minWidth="100%" fontSize="14px" onClick={placeOrder}>
        Place Order
      </SuccessButton>
      <GuaranteeDesc>
        All confirmed purhcases are 100% guaranteed.
      </GuaranteeDesc>
    </Container>
  );
};
