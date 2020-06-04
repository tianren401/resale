import { post, del } from '_helpers/api';

function getLockRequestId(requestBody) {
  return post({
    path: 'orders/lock',
    body: {
      ticketGroupId: requestBody.id,
      quantity: requestBody.quantity,
      wholeSalePrice: requestBody.price,
    },
    opts: {},
  });
}

function deleteLockRequestId(lockId) {
  return del({ path: 'orders/lock', parameters: lockId });
}

export const checkoutTickeService = {
  getLockRequestId,
  deleteLockRequestId,
};
