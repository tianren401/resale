import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  PreCheckoutContainer,
  PreCheckoutInfo,
  StyledPreCheckoutHeader,
  BackButton,
  TicketTitle,
  TicketSubTitle,
  SeatImage,
  Price,
  CheckoutTag,
  TagImage,
  CheckoutButton,
  CheckoutFailedContainer,
  StyledTextDiv,
  AlertImage,
  CheckoutQuanityDropdown,
} from './styledComponents';
import {
  getLockRequestIdAction,
  setCheckoutTicketQuantityAction,
  clearPreCheckoutTicketDataAction,
} from '_store/checkoutTicket';
import { Loader } from '_components';
import { deviceSize } from '_constants';
import lockCircleIcon from '_images/lockCircleIcon.svg';
import verifiedStarCircleIcon from '_images/starCircleIcon.svg';
import doubleCheckCircleIcon from '_images/doubleCheckCircleIcon.svg';
import purpleLeftArrow from '_images/purpleLeftArrow.svg';
import whiteLeftArrow from '_images/whiteLeftArrow.svg';
import alertIcon from '_images/alertIcon.svg';

export const PreCheckout = ({ selectedTicketGroup }) => {
  const [quantitySplitOptions, setQuantitySplitOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutFailed, setCheckoutFailed] = useState(false);
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
        failure: () => {
          setLoading(false);
          setCheckoutFailed(true);
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
    dispatch,
    selectedTicketGroup,
    setQuantitySplitOptions,
    checkoutTicket.ticketGroupRange,
    checkoutTicket.ticketGroupSplits,
  ]);

  const PreCheckoutHeader = () => {
    return (
      <StyledPreCheckoutHeader>
        <BackButton buttonSize="small" onClick={handleBackButton}>
          {document.body.clientWidth <= deviceSize.tablet - 1 ? (
            <img src={whiteLeftArrow} alt={'back arrow'} />
          ) : (
            <img src={purpleLeftArrow} alt={'back arrow'} />
          )}
          Back
        </BackButton>
        <TicketTitle>
          Section {checkoutTicket.ticketGroupSection}, Row{' '}
          {checkoutTicket.ticketGroupRow}
        </TicketTitle>
        <TicketSubTitle>
          {checkoutTicket.ticketGroupRange?.[0]} -{' '}
          {checkoutTicket.ticketGroupRange?.[1]} Tickets
        </TicketSubTitle>
      </StyledPreCheckoutHeader>
    );
  };

  return (
    <PreCheckoutContainer isOpen={selectedTicketGroup}>
      {loading ? (
        <PreCheckoutInfo>
          <Loader centered />
        </PreCheckoutInfo>
      ) : (
        <PreCheckoutInfo>
          {checkoutFailed ? (
            <PreCheckoutInfo>
              <PreCheckoutHeader />
              <CheckoutFailedContainer>
                <AlertImage src={alertIcon} alt={'alert'} />
                <StyledTextDiv fontWeight={600}>
                  Ticket Unavailable
                </StyledTextDiv>
                <StyledTextDiv>
                  Someone just recently bought this ticket or is in the process
                  of buying it.
                </StyledTextDiv>
              </CheckoutFailedContainer>
            </PreCheckoutInfo>
          ) : (
            <PreCheckoutInfo>
              <PreCheckoutHeader />
              {checkoutTicket.vfsURL && (
                <SeatImage src={checkoutTicket.vfsURL} alt={'view from seat'} />
              )}
              <Price>${checkoutTicket.ticketGroupPrice}/ea</Price>
              <CheckoutQuanityDropdown
                options={quantitySplitOptions}
                defaultOption={checkoutTicket?.ticketGroupSplits[0]}
                plain={false}
                handleChange={handleQuantityChange}
                width={'100%'}
                title={'Quantity'}
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
              <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
            </PreCheckoutInfo>
          )}
        </PreCheckoutInfo>
      )}
    </PreCheckoutContainer>
  );
};

PreCheckout.propTypes = {
  selectedTicketGroup: PropTypes.number,
};
