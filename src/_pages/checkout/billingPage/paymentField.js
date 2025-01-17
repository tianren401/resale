import React, { useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getPaymentMethodNonce, toggleSaveCardInfo } from '_store/checkout';
import { PrimaryButton, H2, Checkbox, dropInUIStyle } from '_components';
import { colors, deviceSize } from '_constants';

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 24px 20px;
  ${dropInUIStyle};

  @media (max-width: ${deviceSize.tablet}px) {
    margin: auto;
    background: ${colors.white};
    max-width: 100%;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 24px;
`;

const Title = styled(H2)`
  font-weight: 500;
  margin-bottom: 32px;

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 18px;
    line-height: 24px;
  }
`;
//Braintree drop-in UI

export const PaymentField = () => {
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const { clientToken, saveCardInfo } = useSelector(
    (state) => state.checkoutReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleSaveCardInfoOption = () => {
    dispatch(toggleSaveCardInfo());
  };

  const handlePurchase = () => {
    dispatch(
      getPaymentMethodNonce({
        instance: braintreeInstance,
        success: () => {
          history.push('/checkout/placeorder');
        },
      })
    );
  };

  return (
    <Container>
      <Title>Payment Information</Title>
      {!!clientToken && (
        <DropIn
          options={{
            authorization: clientToken,
            card: {
              cardholderName: {
                required: true,
              },
              overrides: {
                fields: {
                  number: {
                    placeholder: 'Card Number',
                  },
                  cvv: {
                    required: true,
                    maskInput: false,
                  },
                  postalCode: {
                    required: true,
                    maxlength: 5,
                  },
                },
                styles: {
                  input: {
                    'font-size': '14px',
                    'line-height': '22px',
                    color: `${colors.black}`,
                  },
                },
              },
            },
            venmo: {},
            paypal: {
              flow: 'vault',
            },
            vaultManager: false,
          }}
          onInstance={(instance) => setBraintreeInstance(instance)}
        />
      )}
      <StyledCheckbox
        label="Save Credit Card for future payments"
        checked={saveCardInfo}
        handleChange={toggleSaveCardInfoOption}
      />
      <PrimaryButton
        minWidth="100%"
        fontSize="14px"
        buttonSize="large"
        onClick={handlePurchase}
      >
        Preview Order
      </PrimaryButton>
    </Container>
  );
};
