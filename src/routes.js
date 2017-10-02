import React from 'react';
import { Route } from 'react-router';

import App from './containers/app/App';

import AuthWrapper from './components/auth/AuthWrapper';
import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import RestorePassword from './containers/auth/RestorePassword';

export const namedRoutes = {
  base: '/',
  signIn: '/sign-in'
};

const routes = (
  <Route path="/" component={App}>
    <Route path="auth" component={AuthWrapper}>
      <Route path="signup" component={SignUp}/>
      <Route path="signin" component={SignIn}/>
      <Route path="password" component={RestorePassword}/>
    </Route>
  </Route>
);

export default routes;
