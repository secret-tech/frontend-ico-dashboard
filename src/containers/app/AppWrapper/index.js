import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      location
    } = this.props;

    const {
      pathname
    } = location;

    const kycToBool = () => {
      if (kycStatus !== 'verified') {
        return false;
      }

      return true;
    };

    return (
      <div className={s.wrapper}>
        {!kycToBool() &&
          <Alert>
            <a href={namedRoutes.verification}>
              Participation in ICO requires you to complete verification process
            </a>
          </Alert>}
        <div className={!kycToBool() ? s.sidebarWithAlert : s.sidebar}>
          <Sidebar kyc={kycToBool()} location={location}/>
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
