import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { routerActions } from 'react-router-redux';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect';

import App from './containers/app/App';

import AuthWrapper from './components/auth/AuthWrapper';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import RestorePassword from './containers/auth/RestorePassword';

import AppWrapper from './containers/app/AppWrapper';
import Dashboard from './containers/dashboard/Dashboard';
import Referrals from './containers/referrals/Referrals';
import Transactions from './containers/transactions/Transactions';
import Account from './containers/account/Account';
import Verification from './components/verification/Verification';
import SendTokens from './containers/sendTokens/SendTokens/index';

export const namedRoutes = {
  base: '/',
  signIn: '/auth/signin',
  signUp: '/auth/signup',
  password: '/auth/password',
  dashboard: '/dashboard',
  transactions: '/dashboard/transactions',
  referrals: '/dashboard/referrals',
  sendTokens: '/dashboard/send-tokens',
  account: '/dashboard/account',
  verification: '/dashboard/verification'
};

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: namedRoutes.signIn,
  allowRedirectBack: false,
  authenticatedSelector: (state) => state.app.app.authorized,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: namedRoutes.dashboard,
  allowRedirectBack: false,
  authenticatedSelector: (state) => !state.app.app.authorized,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});

const userIsVerified = connectedRouterRedirect({
  redirectPath: namedRoutes.dashboard,
  allowRedirectBack: false,
  authenticatedSelector: (state) => state.app.app.user.kycStatus !== 'verified',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsVerified'
});

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/dashboard"/>

    <Route path="auth" component={userIsNotAuthenticated(AuthWrapper)}>
      <Route path="signup" component={SignUp}>
        <Route path=":referralCode" component={SignUp}/>
      </Route>
      <Route path="signin" component={SignIn}/>
      <Route path="password" component={RestorePassword}/>
    </Route>

    <Route path="dashboard" component={userIsAuthenticated(AppWrapper)}>
      <IndexRoute component={Dashboard}/>
      <Route path="transactions" component={Transactions}/>
      <Route path="referrals" component={Referrals}/>
      <Route path="send-tokens" component={SendTokens}/>
      <Route path="account" component={Account}/>
      <Route path="verification" component={userIsVerified(Verification)}/>
    </Route>
  </Route>
);

export default routes;
