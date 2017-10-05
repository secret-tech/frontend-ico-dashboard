const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
const NUMBER_REGEXP = /^\d+$/;

export const required = (msg) =>
  (value) =>
    (value ? '' : msg || 'required');

export const minLength = (limit, msg) =>
  (value) =>
    (limit && value && value.length >= limit ? '' : msg || `minLength ${limit}`);

export const maxLength = (limit, msg) =>
  (value) =>
    (limit && value && value.length <= limit ? '' : msg || `maxLength ${limit}`);

export const length = (prop, msg) =>
  (value) =>
    (value && prop && value.length === prop ? '' : msg || `length ${prop}`);

export const email = (msg) =>
  (value) =>
    (value && EMAIL_REGEXP.test(value) ? '' : msg || 'invalid email');

export const password = (msg) =>
  (value) =>
    (value && PASSWORD_REGEXP.test(value) ? '' : msg || 'incorrect password');

export const number = (msg) =>
  (value) =>
    (value && NUMBER_REGEXP.test(value) ? '' : msg || 'not number');

export const emailValidate = [
  required('Must be filled'),
  email('Invalid e-mail')
];

export const passwordValidate = [
  required('Must be filled'),
  password('Invalid password')
];
