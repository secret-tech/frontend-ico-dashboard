import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import AuthTopbar from '../../auth/AuthTopbar';
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';
import ResetPassword from '../../auth/ResetPassword';

import s from './styles.scss';

class AuthWrapper extends Component {
  render() {
    return (
      <div className={s.auth}>
        <AuthTopbar/>
        <div className={s.logo}>
          {'>_ secret_tech'}
        </div>
        <Switch>
          <Route exact path="/auth/sign-in" component={SignIn}/>
          <Route exact path="/auth/sign-up" component={SignUp}/>
          <Route exact path="/auth/reset-password" component={ResetPassword}/>
          <Redirect from="*" to="/auth/sign-in"/>
        </Switch>
      </div>
    );
  }
}

const ConnectedComponent = connect(null)(AuthWrapper);
const ComponentWithRouter = withRouter(ConnectedComponent);
const TranslatedComponent = translate('app')(ComponentWithRouter);
export default TranslatedComponent;
