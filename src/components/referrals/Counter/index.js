import React from 'react';
import { translate } from 'react-i18next';
import cx from 'classnames';
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
        <h2>{t('earnedTokens', { earned })}</h2>
        <div className={cx('pt-text-muted', s.label)}>{t('earnedFromReferrals')}</div>
      </div>

      <div className={s.block}>
        <h2>{referralsQty}</h2>
        <div className={cx('pt-text-muted', s.label)}>{t('numberOfReferrals')}</div>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('referrals')(Counter);

export default TranslatedComponent;
