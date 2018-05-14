import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AnchorButton } from '@blueprintjs/core';

import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';
import ResetPassword from '../../auth/ResetPassword';

import s from './styles.scss';

class AuthWrapper extends Component {
  render() {
    return (
      <div className={s.auth}>
        <div className={s.topbar}>
          <div>
            <AnchorButton
              href="https://moonwallet.tech"
              className="pt-minimal"
              tabIndex="0"
              icon="chevron-left">
                Back to landing page
            </AnchorButton>
          </div>
        </div>
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
export default ComponentWithRouter;
