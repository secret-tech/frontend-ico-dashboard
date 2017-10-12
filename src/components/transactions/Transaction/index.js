import React from 'react';
import s from './styles.css';

const Transaction = (props) => {
  console.log(props);

  const renderLabel = (label) => {
    switch (label) {
      case 'failure':
        return (<span className={s.failure}>FAILURE</span>);
      case 'success':
        return (<span className={s.success}>SUCCESS</span>);
      case 'pending':
        return (<span className={s.pending}>PENDING</span>);
      default:
        return null;
    }
  };

  return (
    <div className={s.transaction}>
      <div className={s.info}>
        <div className={s.date}>02/01/2017</div>
        <div className={s.name}>JCR Tokens buying (+100 000)</div>
        <div className={s.address}>
          <span>Transaction ID —</span>
          <a href="https://etherscan.io" target="_blank">0x491be...53d7d43</a>
          {renderLabel('pending')}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
