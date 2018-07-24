import React from 'react';
import { translate } from 'react-i18next';

const VerifyTip = (props) => {
  const {
    t,
    method
  } = props;

  return method === 'google_auth'
    ? <div>{t('verifyTip.google')}</div>
    : <div>{t('verifyTip.email')}</div>;
};

export default translate('common')(VerifyTip);
