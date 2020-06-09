import React, { useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getPaymentMethodNonce } from '_store/checkout';
import { getClientToken } from '_store/checkout';
import { dropInUIStyle, SuccessButton, TextButton } from '_components';
import { colors, deviceSize } from '_constants';

const Container = styled.div`
  width: 100%;
  [data-braintree-id='methods-container'] {
    .braintree-method__icon-container.braintree-method__check-container {
      display: none;
    }
  }

  [data-braintree-id='toggle'] {
    margin-top: 30px;
    padding: 0;
    text-align: left;
    background: ${colors.white};
    & > span {
      border: none;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: ${colors.brand};
      visibility: hidden;

      &:before {
        content: 'Add new card';
        visibility: visible;
      }

      &:hover {
        color: ${colors.lightBrand};
      }
    }
  }
  ${dropInUIStyle};

  @media (max-width: ${deviceSize.tablet}px) {
    margin: auto;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  & > div {
    width: 10px;
  }
`;

//Braintree drop-in UI

export const BraintreeDropIn = () => {
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const { clientToken } = useSelector((state) => state.checkoutReducer);

  const dispatch = useDispatch();

  const cancelCard = () => {
    dispatch(
      getClientToken({
        success: () => {},
      })
    );
  };

  const saveCard = () => {
    dispatch(
      getPaymentMethodNonce({
        instance: braintreeInstance,
        success: () => {
          cancelCard();
        },
      })
    );
  };

  return (
    <Container>
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
            vaultManager: true,
            preselectVaultedPaymentMethod: false,
          }}
          onInstance={(instance) => setBraintreeInstance(instance)}
        />
      )}
      <ButtonDiv>
        <TextButton
          color={colors.danger}
          hoverColor={colors.dangerHover}
          minWidth="120px"
          onClick={cancelCard}
        >
          Cancel
        </TextButton>
        <SuccessButton minWidth="120px" onClick={saveCard}>
          Save Card
        </SuccessButton>
      </ButtonDiv>
    </Container>
  );
};
