import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { translate } from 'react-i18next';
import s from './styles.css';

import { namedRoutes } from '../../../routes';

import { fetchUser } from '../../../redux/modules/app/app';
import { openSidebar, closeSidebar } from '../../../redux/modules/app/sidebar';

import Sidebar from '../../../components/app/Sidebar';
import Topbar from '../../../components/app/Topbar';
import Alert from '../../../components/app/Alert';
import MakeDepositPopup from '../MakeDepositPopup';
import KycAlertPopup from '../KycAlertPopup';

const cx = classNames.bind(s);

class AppWrapper extends Component {
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    const {
      t,
      children,
      kycStatus,
      location,
      openSidebar,
      closeSidebar,
      sidebarIsOpen
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

    const sidebarClassName = cx(
      s.sidebar,
      !kycToBool() && s.alert,
      sidebarIsOpen && s.open
    );

    return (
      <div className={s.wrapper}>
        {!kycToBool() &&
          <Alert>
            <a href={namedRoutes.verification}>
              {t('requireVerificationMessage')}
            </a>
          </Alert>}
        <div className={sidebarClassName}>
          <Sidebar kyc={kycToBool()} location={location} closeSidebar={() => closeSidebar()}/>
        </div>
        <div className={s.main}>
          <Topbar pathname={pathname} openSidebar={() => openSidebar()}/>
          <div className={s.children}>{children}</div>
        </div>

        <MakeDepositPopup/>
        <KycAlertPopup/>
      </div>
    );
  }
}

const TranslatedComponent = translate('app')(AppWrapper);

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus,
    sidebarIsOpen: state.app.sidebar.open
  }),
  {
    fetchUser,
    openSidebar,
    closeSidebar
  }
)(TranslatedComponent);
