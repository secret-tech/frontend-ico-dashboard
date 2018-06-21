import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { fetchUser, logout } from '../../../redux/modules/app/app';

import Topbar from '../../../components/app/Topbar';
import MakeDepositPopup from '../MakeDepositPopup';
import Dashboard from '../../dashboard/Dashboard';
import Referrals from '../../referrals/Referrals';
import Transactions from '../../transactions/Transactions';
import Settings from '../../settings/Settings';
import Shuftipro from '../../../components/verification/Shuftipro';
import Error404 from '../../../components/common/Error404';

import * as routes from '../../../routes';
import { kycIsVerified } from '../../../utils/verification';
import s from './styles.scss';

class AppWrapper extends Component {
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    const {
      kycStatus,
      logout
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <Topbar kyc={kycIsVerified(kycStatus)} logout={logout}/>
        </div>
        <Switch>
          <Route exact path={routes.DASHBOARD} component={Dashboard}/>
          <Route exact path={routes.REFERRALS} component={Referrals}/>
          <Route exact path={routes.TRANSACTIONS} component={Transactions}/>
          <Route exact path={routes.SETTINGS} component={Settings}/>
          <Route exact path={routes.KYC_VERIFICATION} component={Shuftipro}/>
          <Redirect exact from="/" to={routes.DASHBOARD} />
          <Route component={Error404}/>
        </Switch>

        <MakeDepositPopup/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    fetchUser,
    logout
  }
)(AppWrapper);
