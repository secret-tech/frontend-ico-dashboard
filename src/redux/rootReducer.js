import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'react-notification-system-redux';

import app from './modules/app/app';
import makeDepositPopup from './modules/app/makeDepositPopup';

import emailsInput from './modules/common/emailsInput';

import signIn from './modules/auth/signIn';
import signUp from './modules/auth/signUp';
import restorePassword from './modules/auth/restorePassword';

import referrals from './modules/referrals/referrals';
import invitePopup from './modules/referrals/invitePopup';

import changePassword from './modules/account/changePassword';
import enableTwoFactorAuth from './modules/account/enableTwoFactorAuth';
import disableTwoFactorAuth from './modules/account/disableTwoFactorAuth';

import dashboard from './modules/dashboard/dashboard';
import buyTokens from './modules/dashboard/buyTokens';

import transactions from './modules/transactions/transactions';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  notifications: notificationsReducer,

  app: combineReducers({
    app,
    makeDepositPopup
  }),

  common: combineReducers({
    emailsInput
  }),

  auth: combineReducers({
    signIn,
    signUp,
    restorePassword
  }),

  referrals: combineReducers({
    referrals,
    invitePopup
  }),

  account: combineReducers({
    changePassword,
    enableTwoFactorAuth,
    disableTwoFactorAuth
  }),

  dashboard: combineReducers({
    dashboard,
    buyTokens
  }),

  transactions: combineReducers({
    transactions
  })
});
