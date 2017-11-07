import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';
import { bigNum } from '../../../helpers/common/common';

const BalanceInfo = (props) => {
  console.log(props);

  return (
    <div className={s.balance}>
      <div className={s.block}>
        <div className={s.val}>{bigNum(1.33949493)}</div>
        <div className={s.label}>ETH balance</div>
      </div>

      <div className={s.block}>
        <div className={s.val}>{bigNum(123949, 2)}</div>
        <div className={s.label}>JCR token balance</div>
      </div>
    </div>
  );
};

export default connect(null)(BalanceInfo);
