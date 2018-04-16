import React from 'react';
import { translate } from 'react-i18next';
import { Button } from '@blueprintjs/core';
import s from './styles.css';

const TwoFactorAuth = (props) => {
  const {
    t, method, enable, disable
  } = props;

  const renderButton = (method) => {
    switch (method) {
      case 'email':
        return (
          <Button
            onClick={() => enable()}>{t('enableTwoFactorAuth')}</Button>
        );
      case 'google_auth':
        return (
          <Button
            onClick={() => disable()}>{t('disableTwoFactorAuth')}</Button>
        );
      default:
        return (
          <Button
            onClick={() => enable()}>{t('enableTwoFactorAuth')}</Button>
        );
    }
  };

  return (
    <div className={s.container}>
      {renderButton(method)}
    </div>
  );
};

export default translate('settings')(TwoFactorAuth);
