import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'react-notification-system-redux';

import app from './modules/app/app';
import makeDepositPopup from './modules/app/makeDepositPopup';
import kycAlertPopup from './modules/app/kycAlertPopup';
import sidebar from './modules/app/sidebar';

import emailsInput from './modules/common/emailsInput';

import signInReducer from './modules/auth/signIn';
import signUpReducer from './modules/auth/signUp';
import restorePassword from './modules/auth/restorePassword';

import referrals from './modules/referrals/referrals';
import invitePopup from './modules/referrals/invitePopup';

import changePasswordReducer from './modules/account/changePassword';
import enableTwoFactorAuth from './modules/account/enableTwoFactorAuth';
import disableTwoFactorAuth from './modules/account/disableTwoFactorAuth';

import dashboard from './modules/dashboard/dashboard';
import buyTokens from './modules/dashboard/buyTokens';
import txFee from './modules/dashboard/txFee';
import txFeeHelp from './modules/dashboard/txFeeHelp';

import transactions from './modules/transactions/transactions';

import sendTokens from './modules/sendTokens/sendTokens';

import verification from './modules/verification/verification';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  notifications: notificationsReducer,

  app: combineReducers({
    app,
    makeDepositPopup,
    kycAlertPopup,
    sidebar
  }),

  common: combineReducers({
    emailsInput
  }),

  auth: combineReducers({
    signIn: signInReducer,
    signUp: signUpReducer,
    restorePassword
  }),

  referrals: combineReducers({
    referrals,
    invitePopup
  }),

  account: combineReducers({
    changePassword: changePasswordReducer,
    enableTwoFactorAuth,
    disableTwoFactorAuth
  }),

  dashboard: combineReducers({
    dashboard,
    buyTokens,
    txFee,
    txFeeHelp
  }),

  transactions: combineReducers({
    transactions
  }),

  sendTokens: combineReducers({
    sendTokens
  }),

  verification: combineReducers({
    verification
  })
});
