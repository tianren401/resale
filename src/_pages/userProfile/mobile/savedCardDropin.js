import React, { useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { dropInUIStyle, PrimaryButton } from '_components';
import { colors } from '_constants';
import { getPaymentMethodNonce } from '_store/checkout';

const Container = styled.div`
  width: 100%;
  ${(props) =>
    props.method === 'add' &&
    css`
      max-width: 400px;
      margin: auto;
      padding-top: 80px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      [data-braintree-id='methods-edit'] {
        display: none;
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
            content: 'Add a new card';
            visibility: visible;
          }

          &:hover {
            color: ${colors.lightBrand};
          }
        }
      }
    `}

  ${(props) =>
    props.method === 'save' &&
    css`
      padding: 20px 0;
      border-bottom: 1px solid ${colors.lightGray};
      [data-braintree-id='sheet-container'] {
        display: none;
      }
      [data-braintree-id='toggle'] {
        display: none;
      }
      [data-braintree-id='methods-label'] {
        display: none;
      }
    `}

  [data-braintree-id='methods-container'] {
    .braintree-method__icon-container.braintree-method__check-container {
      display: none;
    }
  }

  [data-braintree-id='methods-container'] {
    .braintree-method__icon-container.braintree-method__check-container {
      display: none;
    }
  }
  ${dropInUIStyle};

  [data-braintree-id='methods-label'] {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.darkGray};
  }
  [data-braintree-id='methods'] {
    [data-braintree-id='methods-container'] {
      border: none;
    }
  }
`;

//Braintree drop-in UI

export const SavedCardDropin = ({ method }) => {
  const history = useHistory();
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const { clientToken } = useSelector((state) => state.checkoutReducer);
  const dispatch = useDispatch();

  const saveCard = () => {
    dispatch(
      getPaymentMethodNonce({
        instance: braintreeInstance,
        success: () => {
          history.push('/user/mobile');
        },
      })
    );
  };

  return (
    <Container method={method}>
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
      {method === 'add' && (
        <PrimaryButton
          minWidth="100%"
          fontSize="14px"
          buttonSize="large"
          onClick={saveCard}
        >
          Add New Card
        </PrimaryButton>
      )}
    </Container>
  );
};

SavedCardDropin.propTypes = {
  method: PropTypes.string,
};
