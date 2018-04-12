import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import s from './styles.css';

import { fetchUser } from '../../../redux/modules/app/app';
import { openSidebar, closeSidebar } from '../../../redux/modules/app/sidebar';

import Topbar from '../../../components/app/Topbar';
import MakeDepositPopup from '../MakeDepositPopup';
import KycAlertPopup from '../KycAlertPopup';
import Dashboard from '../../dashboard/Dashboard';
import Referrals from '../../referrals/Referrals';
import Transactions from '../../transactions/Transactions';
import Account from '../../account/Account';
import SendTokens from '../../sendTokens/SendTokens';
import Verification from '../../../components/verification/Verification';

import namedRoutes from '../../../routes';

class AppWrapper extends Component {
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    const {
      location
    } = this.props;

    const {
      pathname
    } = location;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <Topbar pathname={pathname} />
        </div>
        <Switch>
          <Route exact path={namedRoutes.dashboard} component={Dashboard}/>
          <Route exact path={namedRoutes.referrals} component={Referrals}/>
          <Route exact path={namedRoutes.transactions} component={Transactions}/>
          <Route exact path={namedRoutes.account} component={Account}/>
          <Route exact path={namedRoutes.sendTokens} component={SendTokens}/>
          <Route exact path={namedRoutes.verification} component={Verification}/>
        </Switch>

        <MakeDepositPopup/>
        <KycAlertPopup/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    sidebarIsOpen: state.app.sidebar.open
  }),
  {
    fetchUser,
    openSidebar,
    closeSidebar
  }
)(AppWrapper);
