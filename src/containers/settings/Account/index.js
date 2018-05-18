import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button } from '@blueprintjs/core';
import s from './styles.css';

import { openChangePasswordPopup } from '../../../redux/modules/settings/changePassword';
import { openEnableTwoFactorAuthPopup } from '../../../redux/modules/settings/enableTwoFactorAuth';
import { openDisableTwoFactorAuthPopup } from '../../../redux/modules/settings/disableTwoFactorAuth';

import AccountField from '../../../components/settings/AccountField';

import { kycIsVerified } from '../../../utils/verification';

const Account = (props) => {
  const {
    t,
    fetching,
    openChangePasswordPopup,
    openEnableTwoFactorAuthPopup,
    openDisableTwoFactorAuthPopup,
    defaultVerificationMethod,
    email,
    firstName,
    lastName,
    phone,
    dob,
    country,
    kycStatus
  } = props;

  // const fetching = true;

  return (
    <div className={s.info}>
      <div className={s.account}>
        <h4>
          {firstName} {lastName}
          {kycIsVerified(kycStatus)
            ? (<span className={s.green}>Account verified</span>)
            : (<span className={s.red}>Verification required</span>)}
        </h4>
        <div className={s.fields}>
          <div className={s.field}>
            <AccountField
              label="Email"
              value={email}
              fetching={fetching}
              placeholderWidth={{ label: '130px', val: '100px' }}/>
          </div>

          <div className={s.field}>
            <AccountField
              label="Phone"
              value={phone}
              fetching={fetching}
              placeholderWidth={{ label: '130px', val: '100px' }}/>
          </div>

          <div className={s.field}>
            <AccountField
              label="Country"
              value={country}
              fetching={fetching}
              placeholderWidth={{ label: '130px', val: '100px' }}/>
          </div>

          <div className={s.field}>
            <AccountField
              label="Date of birth"
              value={dob}
              fetching={fetching}
              placeholderWidth={{ label: '130px', val: '100px' }}/>
          </div>
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
