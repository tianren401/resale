import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';

import { H1, H4, H5, ContentImage, Emoji } from '_components';
import { isMobileDevice } from '_helpers';
import { colors, deviceSize } from '_constants';
import { setCheckoutState } from '_store/checkout';
import mail from '_images/mail.svg';
import heroImage from '_images/confirmationHeroBackground.png';
import heroMobileImage from '_images/confirmationHeroBackgroundMobile.png';

const Container = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;

const ConfirmationHero = styled.div`
  display: flex;
  width: 100%;
  min-height: 380px;
  justify-content: center;
  padding-top: 130px;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${heroImage});
  clip-path: polygon(0% 0%, 100% 0%, 100% 45%, 0% 100%);
  box-shadow: inset 0px -10px 40px rgba(0, 0, 0, 0.25);

  @media (max-width: ${deviceSize.tablet}px) {
    min-height: 335px;
    clip-path: none;
    box-shadow: none;
    padding: 65px 20px 0;
    background-image: url(${heroMobileImage});
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${deviceSize.tablet}px) {
    justify-content: flex-start;
  }
`;

const ConfrimationGroup = styled.div`
  border: 2px solid ${colors.lightGray};
  border-radius: 8px;
  padding: 25px;

  @media (max-width: ${deviceSize.tablet}px) {
    border: none;
    padding: 0 20px;
    border-radius: 0;
  }
`;

const MailImage = styled(ContentImage)`
  background: ${colors.lightBrand};
  padding: 6px;
  border-radius: 50%;
  margin-right: 12px;
`;

const DeliveryInfo = styled.div`
  margin-top: 24px;

  > h5 {
    line-height: 22px;
  }
`;

export const Confirmation = () => {
  const dispatch = useDispatch();
  const { paymentMethod, deliveryInfo } = useSelector(
    (state) => state.checkoutReducer
  );
  const {
    event,
    ticketGroupPrice,
    ticketGroupQuantity,
    ticketGroupSection,
    ticketGroupRow,
  } = useSelector((state) => state.checkoutTicketReducer);
  const date = format(new Date(event.date), "EEEE MMM do 'at' h:mma");

  useEffect(() => {
    dispatch(setCheckoutState(3));
  }, [dispatch]);

  return (
    <Container>
      <ConfirmationHero>
        {isMobileDevice ? (
          <H1 color={colors.white}>
            Let’s <Emoji symbol="👏" /> Goooo!
            <Emoji symbol="👏" />
            <Emoji symbol="🔥" />
          </H1>
        ) : (
          <H1 color={colors.white}>
            <Emoji symbol="🎉" /> Let’s Goooo! <Emoji symbol="👏" />
          </H1>
        )}
      </ConfirmationHero>
      <Content>
        <ConfrimationGroup>
          <H4>Check your email!</H4>
          <H5 lineHeight="22px" marginTop="15px">
            <MailImage src={mail} />
            Your e-tickets were sent to {deliveryInfo.email}
          </H5>
          <DeliveryInfo>
            <H5>{event.name}</H5>
            <H5>{date}</H5>
            <H5>
              {event.city}, {event?.stateProvince} - {event.venue}
            </H5>
            <H5>
              Section {ticketGroupSection}, Row {ticketGroupRow}
            </H5>
            {ticketGroupQuantity > 1 ? (
              <H5 marginTop="15px">{ticketGroupQuantity} Tickets</H5>
            ) : (
              <H5 marginTop="15px">{ticketGroupQuantity} Ticket</H5>
            )}
            <H5>
              ${ticketGroupPrice * ticketGroupQuantity + 1} charged to your{' '}
              {paymentMethod.type} ending in {paymentMethod.lastFour}
            </H5>
          </DeliveryInfo>
        </ConfrimationGroup>
      </Content>
    </Container>
  );
};
