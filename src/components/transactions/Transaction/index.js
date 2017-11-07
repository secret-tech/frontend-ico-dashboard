import React from 'react';
import { format } from 'date-fns';
import s from './styles.css';

import { shortAddress } from '../../../helpers/common/common';

const Transaction = (props) => {
  const {
    timestamp,
    transactionHash,
    status,
    type,
    direction,
    ethAmount,
    jcrAmount
  } = props;

  console.log(props);

  const renderLabel = (label) => {
    switch (label) {
      case 'failed':
        return (<span className={s.failure}>FAILED</span>);
      case 'confirmed':
        return (<span className={s.success}>CONFIRMED</span>);
      case 'pending':
        return (<span className={s.pending}>PENDING</span>);
      default:
        return null;
    }
  };

  const renderName = () => {
    if (type === 'eth_transfer' && direction === 'in') {
      return (<div className={s.name}>ETH in (+ {ethAmount} ETH)</div>);
    }

    if (type === 'eth_transfer' && direction === 'out') {
      return (<div className={s.name}>ETH out (- {ethAmount} ETH)</div>);
    }

    if (type === 'jcr_transfer' && direction === 'in') {
      return (<div className={s.name}>JCR Tokens in (+ {jcrAmount} JCR)</div>);
    }

    if (type === 'eth_transfer' && direction === 'out') {
      return (<div className={s.name}>JCR Tokens out (- {jcrAmount} JCR)</div>);
    }
  }

  return (
    <div className={s.transaction}>
      <div className={s.info}>
        <div className={s.date}>{format(new Date(timestamp * 1000), 'DD/MM/YYYY')}</div>
        {renderName()}
        <div className={s.address}>
          <span>Transaction ID —</span>
          <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank">{shortAddress(transactionHash)}</a>
          {renderLabel(status)}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
