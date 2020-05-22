import { get, post } from '_helpers/api';

function getBraintreeClientToken() {
  return get('payment/token');
}

function submitTicketOrder(request) {
  return post('orders/submit', request);
}

export const checkoutService = {
  getBraintreeClientToken,
  submitTicketOrder,
};
