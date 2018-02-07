import React from 'react';
import { translate } from 'react-i18next';
import s from './styles.css';

const Counter = (props) => {
  const {
    t,
    earned,
    referralsQty
  } = props;

  return (
    <div className={s.counter}>
      <div className={s.block}>
        <div className={s.qty}>{t('earnedTokens', { ...earned })}</div>
        <div className={s.label}>{t('earnedFromReferrals')}</div>
      </div>

      <div className={s.block}>
        <div className={s.qty}>{referralsQty}</div>
        <div className={s.label}>{t('numberOfReferrals')}</div>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('referrals')(Counter);

export default TranslatedComponent;
