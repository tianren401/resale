import { post } from 'helpers/api';

function login(username, password) {
  return post('auth', { username, password });
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
  setAuthInStorage,
  getAuthFromStorage,
  removeAuthInStorage,
};
