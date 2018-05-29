import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AnchorButton } from '@blueprintjs/core';

import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';
import ResetPassword from '../../auth/ResetPassword';

import config from '../../../utils/config';
import s from './styles.scss';

class AuthWrapper extends Component {
  render() {
    const {
      t
    } = this.props;

    return (
      <div className={s.auth}>
        <div className={s.topbar}>
          <div>
            <AnchorButton
              href={config.landingPageDomain}
              className="pt-minimal"
              tabIndex="0"
              icon="chevron-left">
              {t('authWrapper.back')}
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
const TranslatedComponent = translate('app')(ComponentWithRouter);
export default TranslatedComponent;
