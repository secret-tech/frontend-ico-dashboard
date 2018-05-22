import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NonIdealState } from '@blueprintjs/core';

import { fetchTransactions } from '../../../redux/modules/transactions/transactions';

import Preloader from '../../../components/common/Preloader';
import Creds from '../../../components/dashboard/Creds';
import Transaction from '../../../components/transactions/Transaction';

import s from './styles.scss';


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
    const { t, transactions, fetching } = this.props;

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

    if (fetching) {
      return <Preloader/>;
    }

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <h2>Transactions history</h2>
          <div className={s.txs}>
            {transactions.length > 0 ? renderTransactions() : renderMock()}
          </div>
        </div>

        <div className={s.col}>
          <div className={s.widget}><Creds/></div>
        </div>
      </div>
    );
  }
}


const TranslatedComponent = translate('transactions')(Transactions);

export default connect(
  (state) => ({
    transactions: state.transactions.transactions.transactions,
    fetching: state.transactions.transactions.fetching,
  }),
  {
    fetchTransactions
  }
)(TranslatedComponent);
