import React from 'react';
import s from './styles.css';

const Counter = (props) => {
  const {
    earned,
    referralsQty
  } = props;

  return (
    <div className={s.counter}>
      <div className={s.block}>
        <div className={s.qty}>{earned}</div>
        <div className={s.label}>Earned from referrals</div>
      </div>

      <div className={s.block}>
        <div className={s.qty}>{referralsQty}</div>
        <div className={s.label}>Number of referrals</div>
      </div>
    </div>
  );
};

export default Counter;
