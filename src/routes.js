import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/App';

import AuthWrapper from './components/auth/AuthWrapper';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import RestorePassword from './containers/auth/RestorePassword';

import AppWrapper from './containers/app/AppWrapper';

export const namedRoutes = {
  base: '/',
  signIn: '/auth/signin',
  signUp: '/auth/signup',
  password: '/auth/password',
  dashboard: '/dashboard',
  transactions: '/dashboard/transactions',
  referrals: '/dashboard/referrals',
  sendTokens: '/dashboard/send-tokens',
  account: '/dashboard/account'
};

const routes = (
  <Route path="/" component={App}>
    <Route path="auth" component={AuthWrapper}>
      <Route path="signup" component={SignUp}>
        <Route path=":referralCode" component={SignUp}/>
      </Route>
      <Route path="signin" component={SignIn}/>
      <Route path="password" component={RestorePassword}/>
    </Route>

    <Route path="dashboard" component={AppWrapper}>
      <IndexRoute component={null}/>
      <Route path="transactions" component={null}/>
      <Route path="referrals" component={null}/>
      <Route path="send-tokens" component={null}/>
      <Route path="account" component={null}/>
    </Route>
  </Route>
);

export default routes;
