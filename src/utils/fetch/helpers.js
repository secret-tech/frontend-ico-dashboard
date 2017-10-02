export class RequestError extends Error {
  constructor(error) {
    super(error.message);

    this.errors = error.errors;
    this.status = error.status_code;
  }
}

/**
 * Checks response status.
 * If status code is not between 200 and 300 throws an error
 *
 * @param  response - http Response object
 * @return            http Response object
 */

export const checkHttpStatus = (res) =>
  (res.ok ? res : res.json());

/**
 * Parse response body to json
 *
 * @param  response - http Response object
 * @return            http Response object
 */

export const parseJSON = (res) => {
  if (res instanceof Response) {
    return res.json();
  }

  throw new RequestError(res);
};
