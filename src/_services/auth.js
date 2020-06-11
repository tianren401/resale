import { get, post } from '_helpers/api';

function login(username, password) {
  return post({ path: 'auth/token', body: { username, password } });
}

function passwordVerify(body) {
  return post({ path: 'auth/verify', body });
}

function signup(firstName, lastName, email, phone, password) {
  return post({
    path: 'users',
    body: {
      firstName,
      lastName,
      email,
      phone,
      password,
      enabled: true,
      role: 'USER',
    },
  });
}

function setAuthInStorage(userAuth) {
  localStorage.setItem('auth', JSON.stringify(userAuth));
}

function getAuthFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('auth'));
  } catch (err) {
    return null;
  }
}

function removeAuthInStorage() {
  localStorage.removeItem('auth');
}

function getUserInfo() {
  return get({
    path: 'users/me',
  });
}

export const authService = {
  login,
  signup,
  getUserInfo,
  setAuthInStorage,
  getAuthFromStorage,
  removeAuthInStorage,
  passwordVerify,
};
