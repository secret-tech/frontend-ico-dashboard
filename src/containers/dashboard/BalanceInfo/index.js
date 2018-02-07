import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';
import { bigNum } from '../../../helpers/common/common';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Button from '../../../components/common/Button';

class BalanceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 'eth',
      raised: 'eth'
    };
  }

  render() {
    const { t, openMakeDepositPopup, dashboard } = this.props;
    const { rate, raised } = this.state;

    const renderRate = (currency) => {
      switch (currency) {
        case 'eth':
          return (<div className={s.val}>{bigNum(dashboard.jcrTokenPrice.ETH)} ETH</div>);
        case 'usd':
          return (<div className={s.val}>{bigNum(dashboard.jcrTokenPrice.USD)} USD</div>);
        default:
          return (<div className={s.val}>{bigNum(dashboard.jcrTokenPrice.ETH)} ETH</div>);
      }
    };

    const renderRaised = (currency) => {
      switch (currency) {
        case 'eth':
          return (<div className={s.val}>{bigNum(dashboard.raised.ETH, 2)} ETH</div>);
        case 'usd':
          return (<div className={s.val}>{bigNum(dashboard.raised.USD, 0)} USD</div>);
        default:
          return (<div className={s.val}>{bigNum(dashboard.raised.ETH, 2)} ETH</div>);
      }
    };

    return (
      <div className={s.balance}>
        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>{t('makeDeposit')}</Button>
        </div>

        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.ethBalance)}</div>
          <div className={s.label}>{t('ethBalance')}</div>
        </div>

        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.jcrTokenBalance, 2)}</div>
          <div className={s.label}>{t('tokenBalance')}</div>
        </div>

        <div className={s.block}>
          {renderRate(rate)}
          <div className={s.label}>
            {t('perToken')}&nbsp;
            <button
              onClick={() => this.setState({ rate: 'eth' })}
              className={rate === 'eth' ? s.activeCurrencyButton : s.currencybutton}>ETH</button>&nbsp;•&nbsp;
            <button
              onClick={() => this.setState({ rate: 'usd' })}
              className={rate === 'usd' ? s.activeCurrencyButton : s.currencybutton}>USD</button>
          </div>
        </div>

        <div className={s.block}>
          <div className={s.val}>{t('tokenBalanceValue', { amount: bigNum(dashboard.jcrTokensSold, 0) })}</div>
          <div className={s.label}>{t('tokensSold')}</div>
        </div>

        <div className={s.block}>
          {renderRaised(raised)}
          <div className={s.label}>
            {t('raisedIn')}&nbsp;
            <button
              onClick={() => this.setState({ raised: 'eth' })}
              className={raised === 'eth' ? s.activeCurrencyButton : s.currencybutton}>ETH</button>&nbsp;•&nbsp;
            <button
              onClick={() => this.setState({ raised: 'usd' })}
              className={raised === 'usd' ? s.activeCurrencyButton : s.currencybutton}>USD</button>
          </div>
        </div>

        {dashboard.daysLeft > 0
          ? (<div className={s.block}>
            <div className={s.val}>{dashboard.daysLeft}</div>
            <div className={s.label}>{t('daysToGo')}</div>
          </div>)
          : null}
      </div>
    );
  }
}

const TranslatedComponent = translate('dashboard')(BalanceInfo);

export default connect(
  (state) => ({
    dashboard: state.dashboard.dashboard
  }),
  {
    openMakeDepositPopup
  }
)(TranslatedComponent);
