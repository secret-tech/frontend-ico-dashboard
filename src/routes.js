export const BASE = '/';

export const DASHBOARD = '/dashboard';
export const TRANSACTIONS = '/transactions';
export const REFERRALS = '/referrals';
export const WITHDRAW = '/withdraw';
export const SETTINGS = '/settings';
export const KYC_VERIFICATION = '/kyc';

export const AUTH = '/auth/';
export const SIGN_IN = '/auth/sign-in';
export const SIGN_UP = '/auth/sign-up';
export const RESET_PASSWORD = '/auth/reset-password';

const namedRoutes = {
  base: '/',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  password: '/auth/password',
  dashboard: '/dashboard',
  transactions: '/dashboard/transactions',
  referrals: '/dashboard/partners-program',
  sendTokens: '/dashboard/send-tokens',
  settings: '/dashboard/settings',
  verification: '/dashboard/verification',
  verificationSuccess: '/dashboard/verification/success',
  verificationFailure: '/dashboard/verification/failure'
};

export default namedRoutes;
