import { post } from '_helpers/api';

function getLockRequestId(requestBody) {
  return post(
    'orders/reserve',
    {
      ticketGroupId: requestBody.id,
      quantity: requestBody.quantity,
      wholeSalePrice: requestBody.price,
    },
    {}
  );
}

export const checkoutTickeService = {
  getLockRequestId,
};
