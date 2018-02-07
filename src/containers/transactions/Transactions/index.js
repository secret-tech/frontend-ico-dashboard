import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
    const { t, transactions, openMakeDepositPopup } = this.props;

    const renderTransactions = () => (
      <div className={s.main}>
        <div className={s.title}>{t('latestTransactions')}</div>
        {this._getSortedTransactions().map((t) =>
          (<Transaction key={`${t.transactionHash}${t.type}${t.from}${t.to}`} {...t}/>))}
      </div>
    );

    const renderMock = () => (
      <div className={s.main}>
        <div className={s.title}>{t('noTransactions')}</div>
        <div className={s.subtitle}>{t('needDeposit')}</div>
        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>{t('makeDeposit')}</Button>
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

const TranslatedComponent = translate('transactions')(Transactions);

export default connect(
  (state) => ({
    transactions: state.transactions.transactions.transactions
  }),
  {
    fetchTransactions,
    openMakeDepositPopup
  }
)(TranslatedComponent);
