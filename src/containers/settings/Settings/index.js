import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import Account from '../Account';
import ChangePasswordPopup from '../ChangePasswordPopup';
import VerifyChangePasswordPopup from '../VerifyChangePasswordPopup';
import Address from '../Address';
import EnableTwoFactorAuthPopup from '../EnableTwoFactorAuthPopup';
import DisableTwoFactorAuthPopup from '../DisableTwoFactorAuthPopup';
import ChangeLanguage from '../ChangeLanguage';
import Creds from '../../../components/dashboard/Creds';

import s from './styles.scss';

class Settings extends Component {
  render() {
    const {
      t
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <h2>{t('title')}</h2>
          <div className={s.account}><Account/></div>
          <div className={s.language}><ChangeLanguage/></div>
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

const TranslatedComponent = translate('settings')(Settings);
export default connect(
  (state) => ({
    ethAddress: state.app.app.user.ethAddress
  }),
  {}
)(TranslatedComponent);
