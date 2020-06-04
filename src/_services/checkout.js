import { get, post } from '_helpers/api';

function getBraintreeClientToken() {
  return get({ path: 'payment/token' });
}

function submitTicketOrder(request) {
  return post({ path: 'orders/submit', body: request });
}

export const checkoutService = {
  getBraintreeClientToken,
  submitTicketOrder,
};
