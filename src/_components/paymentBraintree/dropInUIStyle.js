import { css } from 'styled-components';

import { colors, deviceSize } from '_constants';

export const dropInUIStyle = css`
  [data-braintree-id='wrapper'] {
    z-index: 0;
  }

  [data-braintree-id='methods-edit'] {
    right: 0;
    text-decoration: none;
    color: ${colors.brand};
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;

    &:hover {
      color: ${colors.lightBrand};
    }
  }

  [data-braintree-id='methods-label'] {
    visibility: hidden;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;

    &:before {
      content: 'Saved Cards';
      visibility: visible;
    }
  }
  [data-braintree-id='methods'] {
    background: ${colors.white};
    margin: 0;

    [data-braintree-id='methods-container'] {
      border-top: 1px solid ${colors.lightGray};
      .braintree-method {
        border: none;
        width: 100%;
        padding: 10px 0;

        .braintree-method__label {
          color: ${colors.darkGray};
          font-size: 14px;
        }
        .braintree-method__label--small {
          display: none;
        }
      }
    }
  }

  [data-braintree-id='card'] {
    border: none;
    padding: 0;
    font-size: 14px;
    line-height: 22px;

    .braintree-sheet__content {
      padding: 0;
    }

    .braintree-form__field-group {
      padding: 0;
      margin: 0;
      min-height: 90px;
    }

    [data-braintree-id='save-card-field-group'] {
      min-height: 0;
    }

    .braintree-form__hosted-field {
      border-radius: 6px;
    }

    #braintree__card-view-input__cardholder-name {
      font-size: 14px;
      line-height: 22px;
      color: ${colors.black};
    }

    .braintree-form__label {
      font-size: 12px;
      line-height: 16px;
      color: ${colors.darkGray};
    }

    .braintree-form__field-error {
      font-size: 12px;
      line-height: 16px;
      color: ${colors.danger};
      text-align: left;
    }

    .braintree-sheet__header {
      border: none;
      padding: 0;

      .braintree-sheet__header-label {
        padding-bottom: 8px;
      }
      .braintree-sheet__logo--header {
        display: none;
      }
      [data-braintree-id='card-view-icons'] {
        display: none;
      }
      .braintree-sheet__text {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        margin: 0;
        color: ${colors.black};
        visibility: hidden;
        font-size: 2px;
        line-height: 2px;
        &:before {
          content: 'Enter new card';
          visibility: visible;
          font-size: 24px;
          line-height: 32px;

          @media (max-width: ${deviceSize.tablet}px) {
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }

    [data-braintree-id='cardholder-name-field-group'] {
      .braintree-form__label {
        visibility: hidden;

        &:before {
          content: 'Name on Card';
          visibility: visible;
        }
      }
      .braintree-form__raw-input::placeholder {
        visibility: hidden;
      }
    }

    .braintree-form__flexible-fields {
      flex-wrap: nowrap;

      [data-braintree-id='expiration-date-field-group'] {
        flex-basis: auto;

        .braintree-form__label {
          visibility: hidden;
          font-size: 2px;
          line-height: 2px;

          &:before {
            content: 'Expiry Date';
            visibility: visible;
            font-size: 12px;
            line-height: 16px;
          }

          .braintree-form__descriptor {
            display: none;
          }
        }
      }

      [data-braintree-id='cvv-field-group'] {
        width: 205px;
        flex-basis: auto;
        margin: 0 20px;

        .braintree-form__label {
          visibility: hidden;
          font-size: 2px;
          line-height: 2px;

          &:before {
            content: 'Security Code';
            visibility: visible;
            font-size: 12px;
            line-height: 16px;

            @media (max-width: ${deviceSize.tablet}px) {
              content: 'CVV';
            }
          }
        }
        [data-braintree-id='cvv-label-descriptor'] {
          display: none;
        }
        [data-braintree-id='cvv-icon'] {
          display: none;
        }
      }

      [data-braintree-id='postal-code-field-group'] {
        flex-basis: auto;

        .braintree-form__label {
          visibility: hidden;
          font-size: 2px;
          line-height: 2px;

          &:before {
            content: 'ZIP';
            visibility: visible;
            font-size: 12px;
            line-height: 16px;
          }
        }
      }
    }
  }

  [data-braintree-id='sheet-error'] {
    display: none;
  }

  [data-braintree-id='sheet-container'] {
    margin: 0px;
  }
`;
