import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../../../utils/auth';
import * as routes from '../../../routes';

const AuthRoute = (props) => {
  const {
    component: Component,
    restProps
  } = props;

  const render = (renderProps) => (
    getToken()
      ? <Redirect to={routes.DASHBOARD}/>
      : <Component {...renderProps}/>
  );

  return (
    <Route {...restProps} render={render}/>
  );
};

export default AuthRoute;
