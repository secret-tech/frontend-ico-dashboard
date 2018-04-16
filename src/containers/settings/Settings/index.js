import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openEnableTwoFactorAuthPopup } from '../../../redux/modules/settings/enableTwoFactorAuth';
import { openDisableTwoFactorAuthPopup } from '../../../redux/modules/settings/disableTwoFactorAuth';

import Info from '../Info';
import ChangePasswordPopup from '../ChangePasswordPopup';
import VerifyChangePasswordPopup from '../VerifyChangePasswordPopup';
import TwoFactorAuth from '../../../components/settings/TwoFactorAuth';
import Address from '../../../components/settings/Address';
import EnableTwoFactorAuthPopup from '../EnableTwoFactorAuthPopup';
import DisableTwoFactorAuthPopup from '../DisableTwoFactorAuthPopup';

class Settings extends Component {
  render() {
    const {
      openEnableTwoFactorAuthPopup,
      openDisableTwoFactorAuthPopup,
      defaultVerificationMethod,
      ethAddress
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.info}>
          <Info />
        </div>

        <div className={s.tfa}>
          <TwoFactorAuth
            method={defaultVerificationMethod}
            enable={() => openEnableTwoFactorAuthPopup()}
            disable={() => openDisableTwoFactorAuthPopup()} />
        </div>

        <div className={s.address}>
          <Address address={ethAddress} />
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
    defaultVerificationMethod: state.app.app.user.defaultVerificationMethod,
    ethAddress: state.app.app.user.ethAddress
  }),
  {
    openEnableTwoFactorAuthPopup,
    openDisableTwoFactorAuthPopup
  }
)(Settings);
