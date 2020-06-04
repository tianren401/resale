import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextButton, Dropdown, Loader } from '_components';
import {
  getLockRequestIdAction,
  setCheckoutTicketQuantityAction,
  clearPreCheckoutTicketDataAction,
} from '_store/checkoutTicket';
import lockCircleIcon from '_images/lockCircleIcon.svg';
import verifiedStarCircleIcon from '_images/starCircleIcon.svg';
import doubleCheckCircleIcon from '_images/doubleCheckCircleIcon.svg';
import purpleArrowLeft from '_images/purpleArrowLeft.svg';

const PreCheckoutContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 0%;
  overflow: hidden;
  transition: 0.25s;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.15);

  ${({ isOpen }) =>
    isOpen &&
    `
    width: 100%;
    `};
`;

const PreCheckoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 100%;
  background: white;
  padding: 20px;
`;

const BackButton = styled(TextButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  margin: 10px 0 40px 0;
`;

const TicketTitle = styled.h2`
  font-weight: bold;
  width: 280px;
`;

const TicketSubTitle = styled.div`
  color: #8d8d94;
  width: 280px;
  margin-bottom: 24px;
`;

const SeatImage = styled.img`
  height: 22%;
  width: 280px;
  margin-bottom: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
`;

const Price = styled.div`
  color: #3dcc79;
  font-size: 18px;
  width: 280px;
  margin-bottom: 32px;
`;

const CheckoutTag = styled.div`
  display: flex;
  flex-direction: row;
  color: #8d8d94;
  width: 280px;
  margin-top: 16px;
  align-items: center;
`;

export const TagImage = styled.img`
  position: relative;
  margin-right: 10px;
`;

const Checkout = styled.button`
  height: 48px;
  width: 280px;
  margin-top: 32px;
  background-color: #6726f1;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
`;

export const PreCheckout = ({ selectedTicketGroup }) => {
  const [quantitySplitOptions, setQuantitySplitOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const checkoutTicket = useSelector((state) => state.checkoutTicketReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleQuantityChange = (option) => {
    dispatch(setCheckoutTicketQuantityAction(parseInt(option.key)));
  };

  const handleCheckout = () => {
    setLoading(true);
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

  useEffect(() => {
    if (!selectedTicketGroup) {
      setLoading(true);
      return;
    }
    dispatch(
      setCheckoutTicketQuantityAction(checkoutTicket.ticketGroupSplits[0])
    );

    const getQuantitySplitOptions = () => {
      const resultList = [];
      checkoutTicket.ticketGroupSplits.forEach((split) => {
        if (split === 1) {
          resultList.push({ label: `${split} Ticket`, key: split });
        } else {
          resultList.push({ label: `${split} Tickets`, key: split });
        }
      });

      return resultList;
    };

    setQuantitySplitOptions(getQuantitySplitOptions());
    setLoading(false);
  }, [
    checkoutTicket.ticketGroupSplits,
    dispatch,
    selectedTicketGroup,
    setQuantitySplitOptions,
  ]);

  return (
    <PreCheckoutContainer isOpen={selectedTicketGroup}>
      {loading ? (
        <PreCheckoutInfo>
          <Loader centered />
        </PreCheckoutInfo>
      ) : (
        <PreCheckoutInfo>
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
          <Dropdown
            options={quantitySplitOptions}
            defaultOption={checkoutTicket?.ticketGroupSplits[0]}
            plain={false}
            handleChange={handleQuantityChange}
          />
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
        </PreCheckoutInfo>
      )}
    </PreCheckoutContainer>
  );
};

PreCheckout.propTypes = {
  selectedTicketGroup: PropTypes.number,
};
