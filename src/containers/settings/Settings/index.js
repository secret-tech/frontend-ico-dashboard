import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.scss';

import Account from '../Account';
import ChangePasswordPopup from '../ChangePasswordPopup';
import VerifyChangePasswordPopup from '../VerifyChangePasswordPopup';
import Address from '../Address';
import EnableTwoFactorAuthPopup from '../EnableTwoFactorAuthPopup';
import DisableTwoFactorAuthPopup from '../DisableTwoFactorAuthPopup';
import ChangeTheme from '../ChangeTheme';
import Creds from '../../../components/dashboard/Creds';

class Settings extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <h2>Settings</h2>
          <div className={s.account}><Account/></div>
          <div className={s.theme}><ChangeTheme/></div>
        </div>

        <div className={s.col}>
          <div className={s.widget}><Address/></div>
          <div className={s.widget}><Creds/></div>
        </div>

        <ChangePasswordPopup />
        <VerifyChangePasswordPopup />
        <EnableTwoFactorAuthPopup />
        <DisableTwoFactorAuthPopup />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ethAddress: state.app.app.user.ethAddress
  }),
  {}
)(Settings);
