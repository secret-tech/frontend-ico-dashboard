import React from 'react';
import { format } from 'date-fns';
import { translate } from 'react-i18next';
import cx from 'classnames';
import s from './styles.scss';

import { shortAddress } from '../../../helpers/common/common';

const User = (props) => {
  const {
    t,
    date,
    name,
    walletAddress,
    tokens
  } = props;

  return (
    <div className={cx(s.user)}>
      <h4 className={s.name}>{name}&nbsp;<a href={`https://etherscan.io/address/${walletAddress}`} target="_blank">({shortAddress(walletAddress)})</a></h4>
      {date && <div className="pt-text-muted">{format(new Date(date * 1000), 'D MMM YYYY')}</div>}
      <h4 className={s.tokens}>{t('earnedTokens', { earned: tokens })}</h4>
    </div>
  );
};

const TranslatedComponent = translate('referrals')(User);

export default TranslatedComponent;
