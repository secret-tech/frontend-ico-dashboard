import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openEnableTwoFactorAuthPopup } from '../../../redux/modules/account/twoFactorAuth';

import Info from '../Info';
import ChangePasswordPopup from '../ChangePasswordPopup';
import VerifyChangePasswordPopup from '../VerifyChangePasswordPopup';
import TwoFactorAuth from '../../../components/account/TwoFactorAuth';
import Address from '../../../components/account/Address';
import EnableTwoFactorAuthPopup from '../EnableTwoFactorAuthPopup';

class Account extends Component {
  render() {
    const {
      openEnableTwoFactorAuthPopup
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.info}>
            <Info/>
          </div>

          <div className={s.tfa}>
            <TwoFactorAuth
              enabled={false}
              onClick={() => openEnableTwoFactorAuthPopup()}/>
          </div>

          <div className={s.address}>
            <Address address="fetch me!"/>
          </div>
        </div>

        <ChangePasswordPopup/>
        <VerifyChangePasswordPopup/>
        <EnableTwoFactorAuthPopup/>
      </div>
    );
  }
}

export default connect(
  null,
  {
    openEnableTwoFactorAuthPopup
  }
)(Account);
