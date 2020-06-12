import { get } from '_helpers/api';

function getOrderDetails(payload) {
  const { email, phone, orderId } = payload;
  return get({
    path: `content/order/${orderId}`,
    parameters: {
      email,
      phone,
    },
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
