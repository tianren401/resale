import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { TextButton } from '_components';
import {
  getLockRequestIdAction,
  setCheckoutTicketQuantityAction,
  clearPreCheckoutTicketDataAction,
} from '_store/checkoutTicket';
import lockCircleIcon from '_images/lockCircleIcon.svg';
import verifiedStarCircleIcon from '_images/starCircleIcon.svg';
import doubleCheckCircleIcon from '_images/doubleCheckCircleIcon.svg';
import purpleArrowLeft from '_images/purpleArrowLeft.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: start;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: white;
`;

const BackButton = styled(TextButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  margin: 10% 5%;
`;

const TicketTitle = styled.h2`
  font-weight: bold;
  width: 87.5%;
  margin: 0 auto;
`;

const TicketSubTitle = styled.div`
  color: #8d8d94;
  width: 87.5%;
  margin: 2.5% auto;
`;

const SeatImage = styled.img`
  height: 22%;
  width: 85%;
  margin: 5% auto;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
`;

const Price = styled.div`
  color: #3dcc79;
  font-size: 18px;
  width: 87.5%;
  margin: 5% auto;
`;

const DropDown = styled.select`
  height: 48px;
  width: 87.5%;
  margin: 5% auto;
  font-size: 14px;
  background: #ffffff;
  border: 1px solid #e6e6eb;
  border-radius: 6px;

  &:hover {
    color: #6726f1;
    border: 1px solid #6726f1;
  }
`;

const CheckoutTag = styled.div`
  display: flex;
  flex-direction: row;
  color: #8d8d94;
  width: 87.5%;
  margin: 1% auto;
  align-items: center;
`;

export const TagImage = styled.img`
  position: relative;
  margin-right: 10px;
`;

const Checkout = styled.button`
  height: 48px;
  width: 87.5%;
  margin: 10% auto;
  background-color: #6726f1;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
`;

export const PreCheckout = () => {
  const checkoutTicket = useSelector((state) => state.checkoutTicketReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      setCheckoutTicketQuantityAction(checkoutTicket.ticketGroupSplits[0])
    );
  }, [checkoutTicket.ticketGroupSplits, dispatch]);

  const handleQuantityChange = (event) => {
    dispatch(setCheckoutTicketQuantityAction(event.target.value));
  };

  const handleCheckout = () => {
    dispatch(
      getLockRequestIdAction({
        request: {
          id: checkoutTicket.ticketGroupId,
          quantity: checkoutTicket.ticketGroupQuantity,
          price: checkoutTicket.ticketGroupPrice,
        },
        success: () => {
          history.push('/checkout');
        },
      })
    );
  };

  const handleBackButton = () => {
    dispatch(clearPreCheckoutTicketDataAction());
  };

  return (
    <Container>
      <BackButton onClick={handleBackButton}>
        <img src={purpleArrowLeft} alt={'back arrow'} />
        Back
      </BackButton>
      <TicketTitle>
        {`Section ${checkoutTicket.ticketGroupSection}`}
        {`, Row ${checkoutTicket.ticketGroupRow}`}
      </TicketTitle>
      <TicketSubTitle>
        {`${checkoutTicket.ticketGroupRange?.[0]} - `}
        {`${checkoutTicket.ticketGroupRange?.[1]} Tickets`}
      </TicketSubTitle>
      {checkoutTicket.vfsURL && (
        <SeatImage src={checkoutTicket.vfsURL} alt={'view from seat'} />
      )}
      <Price>{`$${checkoutTicket.ticketGroupPrice}/ea`}</Price>
      <DropDown onChange={handleQuantityChange}>
        {checkoutTicket.ticketGroupSplits.map((split) => (
          <option key={split} value={split}>
            {split}
          </option>
        ))}
      </DropDown>
      <CheckoutTag>
        <TagImage src={lockCircleIcon} />
        <p>Secured</p>
      </CheckoutTag>
      <CheckoutTag>
        <TagImage src={verifiedStarCircleIcon} />
        <p>Verified</p>
      </CheckoutTag>
      <CheckoutTag>
        <TagImage src={doubleCheckCircleIcon} />
        <p>Money Back Guarantee</p>
      </CheckoutTag>
      <Checkout onClick={handleCheckout}>Checkout</Checkout>
      {/* {renderRedirect()} */}
    </Container>
  );
};

PreCheckout.propTypes = {};
