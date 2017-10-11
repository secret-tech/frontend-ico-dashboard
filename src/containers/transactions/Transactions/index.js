import React, { Component } from 'react';
import s from './styles.css';

import Transaction from '../../../components/transactions/Transaction';

class Transactions extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.title}>Latest transactions</div>
          <Transaction/>
        </div>
      </div>
    );
  }
}

export default Transactions;
