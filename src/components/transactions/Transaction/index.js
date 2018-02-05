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
        return (<span className={s.failure}>{t('failed')}</span>);
      case 'confirmed':
        return (<span className={s.success}>{t('confirmed')}</span>);
      case 'pending':
        return (<span className={s.pending}>{t('pending')}</span>);
      default:
        return null;
    }
  };

  const renderName = () => {
    if (type === 'eth_transfer' && direction === 'in') {
      return (<div className={s.name}>{t('received', { amount: ethAmount })}</div>);
    }

    if (type === 'eth_transfer' && direction === 'out') {
      return (<div className={s.name}>{t('sent', { amount: ethAmount })}</div>);
    }

    if (type === 'jcr_transfer' && direction === 'in') {
      return (<div className={s.name}>{t('tokensReceived', { amount: jcrAmount })}</div>);
    }

    if (type === 'jcr_transfer' && direction === 'out') {
      return (<div className={s.name}>{t('tokensSent', { amount: jcrAmount })}</div>);
    }

    return (<div>{t('error')}</div>);
  };

  return (
    <div className={s.transaction}>
      <div className={s.info}>
        <div className={s.date}>{format(new Date(timestamp * 1000), 'DD/MM/YYYY')}</div>
        {renderName()}
        <div className={s.address}>
          <span>{t('transactionId')} — </span>
          <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank">{shortAddress(transactionHash)}</a>
          {renderLabel(status)}
        </div>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('transactions')(Transaction);

export default TranslatedComponent;
