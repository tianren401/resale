import { post } from '_helpers/api';

function login(username, password) {
  return post('auth/token', { username, password });
}

function signup(firstName, lastName, email, phone, password) {
  return post('users', {
    firstName,
    lastName,
    email,
    phone,
    password,
    enabled: true,
    role: 'USER',
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

export const authService = {
  login,
  signup,
  setAuthInStorage,
  getAuthFromStorage,
  removeAuthInStorage,
};
