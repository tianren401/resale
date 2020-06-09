import { put } from '_helpers/api';

function updateUserInfo(body) {
  return put({ path: 'users/update/info', body: body });
}

function updatePassword(body) {
  return put({ path: 'users/update/password', body });
}

export const userService = {
  updateUserInfo,
  updatePassword,
};
