import React from 'react';
import { format } from 'date-fns';
import { translate } from 'react-i18next';
import s from './styles.css';

import { shortAddress } from '../../../helpers/common/common';

const Transaction = (props) => {
  const {
    t,
    timestamp,
    transactionHash,
    status,
    type,
    direction,
    ethAmount,
    jcrAmount
  } = props;

  const renderLabel = (label) => {
    switch (label) {
      case 'failed':
        return (<span className="pt-tag pt-minimal pt-intent-danger">{t('failed')}</span>);
      case 'confirmed':
        return (<span className="pt-tag pt-minimal pt-intent-success">{t('confirmed')}</span>);
      case 'pending':
        return (<span className="pt-tag pt-minimal pt-intent-primary">{t('pending')}</span>);
      default:
        return null;
    }
  };

  const renderName = () => {
    if (type === 'eth_transfer' && direction === 'in') {
      return (<span>{t('received', { amount: ethAmount })}</span>);
    }

    if (type === 'eth_transfer' && direction === 'out') {
      return (<span>{t('sent', { amount: ethAmount })}</span>);
    }

    if (type === 'jcr_transfer' && direction === 'in') {
      return (<span>{t('tokensReceived', { amount: jcrAmount })}</span>);
    }

    if (type === 'jcr_transfer' && direction === 'out') {
      return (<span>{t('tokensSent', { amount: jcrAmount })}</span>);
    }

    return (<span>{t('error')}</span>);
  };

  return (
    <div className={s.transaction}>
      <div className={s.name}>
        {renderName()}&nbsp;
        <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank">
          <span className={s.name}>({shortAddress(transactionHash)})</span>
        </a>
        {renderLabel(status)}
      </div>
      <div className="pt-text-muted">{format(new Date(timestamp * 1000), 'D MMM YYYY')}</div>
    </div>
  );
};

const TranslatedComponent = translate('transactions')(Transaction);

export default TranslatedComponent;
