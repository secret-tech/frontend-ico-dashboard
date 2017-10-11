import React from 'react';
import s from './styles.css';

import Button from '../../common/Button';

const Counter = (props) => {
  const {
    openEmbedCode,
    earned,
    referralsQty
  } = props;

  return (
    <div className={s.counter}>
      <Button size="small" onClick={() => openEmbedCode()}>Embed code</Button>

      <div className={s.tip}>
        Text about embeding ref code program.
        To buy tokenst you need to deposit your account wallet.
      </div>

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
