import React from 'react';
import { translate } from 'react-i18next';
import s from './styles.css';

import Button from '../../common/Button';

const TwoFactorAuth = (props) => {
  const {
    t, method, enable, disable
  } = props;

  const renderButton = (method) => {
    switch (method) {
      case 'email':
        return (
          <Button
            size="small"
            onClick={() => enable()}>{t('enable')}</Button>
        );
      case 'google_auth':
        return (
          <Button
            size="small"
            styl="secondary"
            onClick={() => disable()}>{t('disable')}</Button>
        );
      default:
        return (
          <Button
            size="small"
            onClick={() => enable()}>{t('enable')}</Button>
        );
    }
  };

  return (
    <div className={s.tfa}>
      <div className={s.title}>
        {t('twoFactorAuth')}
      </div>

      <div className={s.body}>
        {renderButton(method)}
      </div>
    </div>
  );
};

export default translate('account')(TwoFactorAuth);
