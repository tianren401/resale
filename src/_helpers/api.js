import { stringify } from 'querystring';
import { baseUrl, esUrl } from '../_constants';
/**
 * API Error - compatible with instanceof
 */
export class ApiError {
  constructor(code, message, body) {
    this.code = code;
    this.message = message;
    this.body = body;
  }
}
Object.setPrototypeOf(ApiError, Error);

/**
 * Handle response from a request (expect json)
 * @private
 *
 * @param {Object} response - Fetch response object
 */
export async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const statusCode = response.status;
  if (statusCode < 400) {
    // download csv endpoint returns content as 'text/plain' instead of 'text/csv'
    if (contentType && contentType.includes('text')) {
      return response.blob();
    }
    return response
      .json()
      .catch(() => null)
      .then((body) => body);
  }

  return response
    .json()
    .catch(() => null)
    .then((body) => {
      throw new ApiError(statusCode, response.statusText, body);
    });
}

//allows us to pass a token with every request
function getAuthFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('auth')).token;
  } catch (err) {
    return null;
  }
}

/**
 * Generic request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} opts - options passed on to the fetch request
 */
export function request({ path, opts = {}, rootURL = '' }) {
  const token = getAuthFromStorage();
  return fetch(`${rootURL || baseUrl}/${path}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    ...opts,
  }).then(handleResponse);
}

/**
 * GET request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} parameters - request parameters in object form
 * @param {Object} opts - options passed on to the fetch request
 */
export function get({ path, parameters = {}, opts = {} }) {
  const search = stringify(parameters);
  return request({
    path: `${path}?${search}`,
    opts: {
      method: 'GET',
      ...opts,
    },
  });
}

/**
 * GET search events
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} parameters - request parameters in object form
 * @param {Object} opts - options passed on to the fetch request
 */
export function getESResults({ path, parameters = {}, opts = {} }) {
  const search = stringify(parameters);
  return request({
    path: `${path}?${search}`,
    opts: {
      method: 'GET',
      ...opts,
    },
    rootURL: esUrl,
  });
}

/**
 * Ajax GET request
 *
 * @param {string} path - request path (no leading "/")
 * @param {string} dataType - expected response content-type
 */
export function ajaxGet(path, dataType) {
  return window.jQuery.ajax({
    url: `${baseUrl}/${path}`,
    dataType: dataType,
  });
}

/**
 * POST request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} body - requesty body
 * @param {Object} opts - options passed on to the fetch request
 */
export function post({ path, body = {}, opts = {} }) {
  return request({
    path,
    opts: {
      method: 'POST',
      body: JSON.stringify(body),
      ...opts,
    },
  });
}

/**
 * PUT request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} body - requesty body
 * @param {Object} opts - options passed on to the fetch request
 */
export function put({ path, body = {}, opts = {} }) {
  return request({
    path,
    opts: {
      method: 'PUT',
      body: JSON.stringify(body),
      ...opts,
    },
  });
}

/**
 * DELETE request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} parameters - request parameters in object form
 * @param {Object} opts - options passed on to the fetch request
 */
export function del({ path, parameters = {}, opts = {} }) {
  const search = stringify(parameters);
  return request({
    path: `${path}?${search}`,
    opts: {
      method: 'DELETE',
      ...opts,
    },
  });
}
