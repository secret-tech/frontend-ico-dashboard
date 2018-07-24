import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button } from '@blueprintjs/core';
import iso3311a2 from 'iso-3166-1-alpha-2';
import format from 'date-fns/format';

import { openInitChangePasswordPopup } from '../../../redux/modules/settings/changePassword';
import { openEnableTwoFactorAuthPopup } from '../../../redux/modules/settings/enableTwoFactorAuth';
import { openDisableTwoFactorAuthPopup } from '../../../redux/modules/settings/disableTwoFactorAuth';

import AccountField from '../../../components/settings/AccountField';

import { kycIsVerified } from '../../../utils/verification';
import s from './styles.scss';

const Account = (props) => {
  const {
    t,
    fetching,
    openInitChangePasswordPopup,
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

  return (
    <div className={s.info}>
      <div className={s.account}>
        <h4>
          {firstName} {lastName}
          {kycIsVerified(kycStatus)
            ? (<span className={s.green}>{t('account.kyc.true')}</span>)
            : (<span className={s.red}>{t('account.kyc.false')}</span>)}
        </h4>
        <div className={s.fields}>
          <div className={s.field}>
            <AccountField
              label={t('account.fields.email')}
              value={email}
              fetching={fetching}
              placeholderWidth={{ label: '40px', val: '150px' }}/>
          </div>

          <div className={s.field}>
            <AccountField
              label={t('account.fields.phone')}
              value={phone}
              fetching={fetching}
              placeholderWidth={{ label: '52px', val: '90px' }}/>
          </div>

          <div className={s.field}>
            <AccountField
              label={t('account.fields.country')}
              value={iso3311a2.getCountry(country)}
              fetching={fetching}
              placeholderWidth={{ label: '63px', val: '100px' }}/>
          </div>

          <div className={s.field}>
            <AccountField
              label={t('account.fields.dob')}
              value={format(dob, 'DD MMMM YYYY')}
              fetching={fetching}
              placeholderWidth={{ label: '47px', val: '123px' }}/>
          </div>
        </div>

        <div className={s.tip}>{t('account.tip')}</div>
      </div>

      <div className={s.button}>
        <Button
          icon="lock"
          onClick={() => openInitChangePasswordPopup()}>
          {t('account.buttons.changePassword')}
        </Button>
      </div>

      <div className={s.button}>
        {defaultVerificationMethod === 'email'
          ? (<Button onClick={() => openEnableTwoFactorAuthPopup()}>
              {t('account.buttons.enable2fa')}
            </Button>)
          : (<Button onClick={() => openDisableTwoFactorAuthPopup()}>
              {t('account.buttons.disable2fa')}
            </Button>)}
      </div>
    </div>
  );
};

const TranslatedComponent = translate('settings')(Account);

export default connect(
  (state) => ({
    fetching: state.app.app.fetching,
    ...state.app.app.user
  }),
  {
    openInitChangePasswordPopup,
    openEnableTwoFactorAuthPopup,
    openDisableTwoFactorAuthPopup
  }
)(TranslatedComponent);
