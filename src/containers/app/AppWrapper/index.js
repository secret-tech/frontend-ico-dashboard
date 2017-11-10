import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import s from './styles.css';

import { namedRoutes } from '../../../routes';

import { fetchUser } from '../../../redux/modules/app/app';

import Sidebar from '../../../components/app/Sidebar';
import Topbar from '../../../components/app/Topbar';
import Alert from '../../../components/app/Alert';
import MakeDepositPopup from '../MakeDepositPopup';
import KycAlertPopup from '../KycAlertPopup';

class AppWrapper extends Component {
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    const {
      children,
      kycStatus,
      location: {
        pathname
      }
    } = this.props;

    const kycToBool = () => {
      if (kycStatus !== 'verified') {
        return false;
      }

      return true;
    };

    return (
      <div className={s.wrapper}>
        {!kycToBool() &&
          <Alert><Link to={namedRoutes.verification}>Verification alert</Link></Alert>}
        <div className={!kycToBool() ? s.sidebarWithAlert : s.sidebar}>
          <Sidebar kyc={kycToBool()}/>
        </div>
        <div className={s.main}>
          <Topbar pathname={pathname}/>
          <div className={s.children}>{children}</div>
        </div>

        <MakeDepositPopup/>
        <KycAlertPopup/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    fetchUser
  }
)(AppWrapper);
