import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button } from '@blueprintjs/core';
import s from './styles.css';

import { openChangePasswordPopup } from '../../../redux/modules/settings/changePassword';
import { openEnableTwoFactorAuthPopup } from '../../../redux/modules/settings/enableTwoFactorAuth';
import { openDisableTwoFactorAuthPopup } from '../../../redux/modules/settings/disableTwoFactorAuth';

import { kycIsVerified } from '../../../utils/verification';

const Account = (props) => {
  const {
    t,
    openChangePasswordPopup,
    openEnableTwoFactorAuthPopup,
    openDisableTwoFactorAuthPopup,
    defaultVerificationMethod,
    email,
    name,
    kycStatus
  } = props;

  return (
    <div className={s.info}>
      <div className={s.account}>
        <h4>
          {name}
          {kycIsVerified(kycStatus)
            ? (<span className={s.green}>Account verified</span>)
            : (<span className={s.red}>Verification required</span>)}
        </h4>
        <div className={s.fields}>
          <div className={s.field}>Email: <b>{email}</b></div>
          <div className={s.field}>Phone: <b>+79997777777</b></div>
          <div className={s.field}>Country: <b>Kingdom of Thailand</b></div>
          <div className={s.field}>Date of birth: <b>26 febriary 1993</b></div>
        </div>

        <div className={s.tip}>
          If that data is invalid - contact with our support to change it.
        </div>
      </div>

      <div className={s.button}>
        <Button
          icon="lock"
          onClick={() => openChangePasswordPopup()}>
          {t('changePassword')}
        </Button>
      </div>

      <div className={s.button}>
        {defaultVerificationMethod === 'email'
          ? (<Button onClick={() => openEnableTwoFactorAuthPopup()}>
              Enable two factor authentication
            </Button>)
          : (<Button onClick={() => openDisableTwoFactorAuthPopup()}>
              Disable two factor authentication
            </Button>)}
      </div>
    </div>
  );
};

const TranslatedComponent = translate('settings')(Account);

export default connect(
  (state) => ({
    ...state.app.app.user
  }),
  {
    openChangePasswordPopup,
    openEnableTwoFactorAuthPopup,
    openDisableTwoFactorAuthPopup
  }
)(TranslatedComponent);
