import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button } from '@blueprintjs/core';
import s from './styles.css';

import { openChangePasswordPopup } from '../../../redux/modules/settings/changePassword';

import { kycIsVerified } from '../../../utils/verification';

const Info = (props) => {
  const {
    t,
    openChangePasswordPopup,
    email,
    kycStatus
  } = props;

  return (
    <div className={s.info}>
      <div className={s.name}>
        <h1 className={s.caption}>{t('caption')}</h1>
        <span>{kycIsVerified(kycStatus) ? <img src={require('./svg/kyc.svg')} title={t('accountVerified')}/> : ''}</span>
      </div>

      <div className={s.email}>
        <h4>{t('email')}</h4>
        {email}
      </div>

      <div className={s.edit}>
        <Button
          icon="lock"
          onClick={() => openChangePasswordPopup()}>
          {t('changePassword')}
        </Button>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('settings')(Info);

export default connect(
  (state) => ({
    email: state.app.app.user.email,
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    openChangePasswordPopup
  }
)(TranslatedComponent);
