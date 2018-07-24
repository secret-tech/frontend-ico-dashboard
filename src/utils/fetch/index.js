import 'whatwg-fetch';
import { pathCreator, checkHttpStatus, parseJSON, authHeader } from './helpers';
import i18next from '../i18n';

import { get as getMock, post as postMock } from './apiMock';

const { API_HOST } = process.env;

/**
 * Fetch wrapper function
 *
 * @param path    - api endpoint
 * @param options - fetch options
 * @returns       - promise
 */

const apiFetch = (path, options = {}) => fetch(pathCreator(path), {
  headers: {
    'Accept': 'application/json', // eslint-disable-line
    'Content-Type': 'application/json',
    'Accept-Language': i18next.language,
    ...authHeader()
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

export const get = API_HOST ? (path) =>
  (apiFetch(path, {
    method: 'GET'
  })) : getMock;

/**
 * Fetch wrapper for POST requests
 *
 * @param path - endpoint
 * @param body - POST request body
 * @return     - promise
 */

export const post = API_HOST ? (path, body) =>
  (apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body)
  })) : postMock;

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
  (apiFetch(path, {
    method: 'DELETE'
  }));
