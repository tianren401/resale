import { get } from '_helpers/api';

function getOrderDetails(id) {
  return get({
    path: `content/order/${id}`,
  });
}

const getUserOrders = (email) => {
  return get({
    path: `content/order/user`,
    parameters: {
      email,
    },
  });
};

export const ordersService = {
  getUserOrders,
  getOrderDetails,
};
