import 'whatwg-fetch';
import { checkHttpStatus, parseJSON } from './helpers';

/**
 * Fetch wrapper function
 *
 * @param path    - api endpoint
 * @param options - fetch options
 * @returns       - promise
 */

const apiFetch = (path, options = {}) => fetch(path, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  ...options
})
  .then(checkHttpStatus)
  .then(parseJSON);

/**
 * Fetch wrapper for GET requests
 *
 * @param path - endpoint
 * @return     - promise
 */

export const get = (path) =>
  (apiFetch(path, {
    method: 'GET'
  }));

/**
 * Fetch wrapper for POST requests
 *
 * @param path - endpoint
 * @param body - POST request body
 * @return     - promise
 */

export const post = (path, body) =>
  (apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body)
  }));

/**
 * Fetch wrapper for PUT requests
 *
 * @param path - endpoint
 * @param body - PUT request body
 * @return     - promise
 */

export const putFn = (path, body) =>
  (apiFetch(path, {
    method: 'PUT',
    body: JSON.stringify(body)
  }));

/**
 * Fetch wrapper for DELETE requests
 *
 * @param path - endpoint
 * @return     - promise
 */

export const del = (path) =>
  (apiFetch(path), {
    method: 'DELETE'
  });
