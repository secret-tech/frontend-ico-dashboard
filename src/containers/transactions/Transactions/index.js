import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NonIdealState } from '@blueprintjs/core';

import { fetchTransactions } from '../../../redux/modules/transactions/transactions';

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
          title={t('mock.title')}
          description={t('mock.message')}
          visual="error" />
      </div>
    );

    const renderSkeletons = () => (
      <div>
        <Transaction skeleton={true}/>
        <Transaction skeleton={true}/>
      </div>
    );

    const renderTxs = () => {
      if (fetching) return renderSkeletons();
      if (transactions.length > 0) return renderTransactions();
      return renderMock();
    };

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <h2>{t('title')}</h2>
          <div className={s.txs}>
            {renderTxs()}
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
