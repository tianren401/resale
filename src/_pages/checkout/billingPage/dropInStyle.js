import { css } from 'styled-components';

import { colors } from '_constants';

export const dropInStyle = css`
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

        &:before {
          content: 'Enter new card';
          visibility: visible;
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

          &:before {
            content: 'Expiry Date';
            visibility: visible;
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

          &:before {
            content: 'Security Code';
            visibility: visible;
          }
        }
        [data-braintree-id='cvv-label-descriptor'] {
          display: none;
        }
      }

      [data-braintree-id='postal-code-field-group'] {
        flex-basis: auto;

        .braintree-form__label {
          visibility: hidden;

          &:before {
            content: 'ZIP';
            visibility: visible;
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
