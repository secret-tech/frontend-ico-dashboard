import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';
import { bigNum } from '../../../helpers/common/common';

const BalanceInfo = (props) => {
  console.log(props);

  const { t } = props;

  return (
    <div className={s.balance}>
      <div className={s.block}>
        <div className={s.val}>{bigNum(1.33949493)}</div>
        <div className={s.label}>ETH {t('balance')}</div>
      </div>

      <div className={s.block}>
        <div className={s.val}>{bigNum(123949, 2)}</div>
        <div className={s.label}>{t('tokenBalance')}</div>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('sendTokens')(BalanceInfo);

export default connect(null)(TranslatedComponent);
