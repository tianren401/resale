import { post, del } from '_helpers/api';

function getLockRequestId(requestBody) {
  return post(
    'orders/lock',
    {
      ticketGroupId: requestBody.id,
      quantity: requestBody.quantity,
      wholeSalePrice: requestBody.price,
    },
    {}
  );
}

function deleteLockRequestId(lockId) {
  return del('orders/lock', lockId);
}

export const checkoutTickeService = {
  getLockRequestId,
  deleteLockRequestId,
};
