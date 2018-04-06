import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NonIdealState } from '@blueprintjs/core';
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
    const { t, transactions } = this.props;

    const renderTransactions = () => (
      <div>
        {this._getSortedTransactions().map((t) =>
          (<Transaction key={`${t.transactionHash}${t.type}${t.from}${t.to}`} {...t}/>))}
      </div>
    );

    const renderMock = () => (
      <div className={s.mock}>
        <NonIdealState
          title={t('noTransactions')}
          description={t('needDeposit')}
          visual="error" />
      </div>
    );

    return (
      <div className={s.wrapper}>
        {transactions.length > 0 ? renderTransactions() : renderMock()}
      </div>
    );
  }
}

const TranslatedComponent = translate('transactions')(Transactions);

export default connect(
  (state) => ({
    transactions: state.transactions.transactions.transactions
  }),
  {
    fetchTransactions
  }
)(TranslatedComponent);
