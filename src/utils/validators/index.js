import Globals from '../../locales/globals';

const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEXP = /^[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
export const NUMBER_REGEXP = /^\d{0,}(\.\d{0,}){0,1}$/;

export const requiredValidator = (msg) =>
  (value) =>
    (value ? '' : msg || 'required');

export const minLength = (limit, msg) =>
  (value) =>
    (limit && value && value.length >= limit ? '' : msg || `minLength ${limit}`);

export const maxLength = (limit, msg) =>
  (value) =>
    (limit && value && value.length <= limit ? '' : msg || `maxLength ${limit}`);

export const minNumber = (limit, msg) =>
  (value) => (limit && value && Number(value) >= limit ? '' : msg || `Min ${limit}`);

export const length = (prop, msg) =>
  (value) =>
    (value && prop && value.length === prop ? '' : msg || `length ${prop}`);

export const email = (msg) =>
  (value) =>
    (value && EMAIL_REGEXP.test(value) ? '' : msg || 'invalid email');

export const password = (msg) =>
  (value) =>
    (value && PASSWORD_REGEXP.test(value) ? '' : msg || 'incorrect password');

export const numberValidator = (msg) =>
  (value) =>
    (value && NUMBER_REGEXP.test(value) ? '' : msg || 'not number');

export const emailValidate = [
  requiredValidator('Must be filled'),
  email('Invalid e-mail')
];

export const passwordValidate = [
  requiredValidator('Must be filled'),
  password('Invalid password')
];

export const fullNameValidate = [
  requiredValidator('Must be filled'),
  minLength(3, 'Min 3 chars'),
  maxLength(30, 'Max 30 chars')
];

export const required = [
  requiredValidator('Must be filled')
];

export const twoFactorCode = [
  minLength(6, 'Require 6 digits'),
  maxLength(6, 'Require 6 digits')
];

export const number = [
  requiredValidator('Must be filled'),
  numberValidator('Only numbers')
];

export const ethInvest = [
  requiredValidator('Must be filled'),
  numberValidator('Only numbers'),
  minNumber(0.1, 'Min 0.1 ETH')
];

export const jcrInvest = (rate) => [
  requiredValidator('Must be filled'),
  numberValidator('Only numbers'),
  minNumber(0.1 / rate, `Min ${0.1 / rate} ${Globals.tokenName}`)
];
