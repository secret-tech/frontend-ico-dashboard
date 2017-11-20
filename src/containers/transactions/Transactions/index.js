import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchTransactions } from '../../../redux/modules/transactions/transactions';
import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Transaction from '../../../components/transactions/Transaction';
import Button from '../../../components/common/Button';

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
    const { transactions, openMakeDepositPopup } = this.props;

    const renderTransactions = () => (
      <div className={s.main}>
        <div className={s.title}>Latest transactions</div>
        {this._getSortedTransactions().map((t) =>
          (<Transaction key={`${t.transactionHash}${t.type}${t.from}${t.to}`} {...t}/>))}
      </div>
    );

    const renderMock = () => (
      <div className={s.main}>
        <div className={s.title}>You don’t have any transactions yet.</div>
        <div className={s.subtitle}>To buy tokens, you need to deposit your account wallet.</div>
        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>Make deposit</Button>
        </div>
      </div>
    );

    return (
      <div className={s.wrapper}>
        {transactions.length > 0 ? renderTransactions() : renderMock()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    transactions: state.transactions.transactions.transactions
  }),
  {
    fetchTransactions,
    openMakeDepositPopup
  }
)(Transactions);
