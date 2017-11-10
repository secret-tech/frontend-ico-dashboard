import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchTransactions } from '../../../redux/modules/transactions/transactions';

import Transaction from '../../../components/transactions/Transaction';

class Transactions extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  _getSortedTransactions() {
    const { transactions } = this.props;

    return []
      .concat(transactions)
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.title}>Latest transactions</div>
          {this._getSortedTransactions().map((t) =>
            (<Transaction key={`${t.transactionHash}${t.type}${t.from}${t.to}`} {...t}/>))}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    transactions: state.transactions.transactions.transactions
  }),
  {
    fetchTransactions
  }
)(Transactions);
