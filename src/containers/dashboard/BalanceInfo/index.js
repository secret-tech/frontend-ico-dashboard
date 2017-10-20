import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { openMakeDepositPopup, dashboard } = this.props;
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
        case 'btc':
          return (<div className={s.val}>{bigNum(dashboard.raised.BTC, 2)} BTC</div>);
        case 'usd':
          return (<div className={s.val}>{bigNum(dashboard.raised.USD, 0)} USD</div>);
        default:
          return (<div className={s.val}>{bigNum(dashboard.raised.ETH, 2)} ETH</div>);
      }
    };

    return (
      <div className={s.balance}>
        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>Make deposit</Button>
        </div>

        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.ethBalance)}</div>
          <div className={s.label}>ETH balance</div>
        </div>

        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.jcrTokenBalance, 2)}</div>
          <div className={s.label}>JCR token balance</div>
        </div>

        <div className={s.block}>
          {renderRate(rate)}
          <div className={s.label}>
            Per JCR token in&nbsp;
            <button
              onClick={() => this.setState({ rate: 'eth' })}
              className={rate === 'eth' ? s.activeCurrencyButton : s.currencybutton}>ETH</button>&nbsp;•&nbsp;
            <button
              onClick={() => this.setState({ rate: 'usd' })}
              className={rate === 'usd' ? s.activeCurrencyButton : s.currencybutton}>USD</button>
          </div>
        </div>

        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.jcrTokensSold, 0)} JCR</div>
          <div className={s.label}>Tokens sold</div>
        </div>

        <div className={s.block}>
          {renderRaised(raised)}
          <div className={s.label}>
            Raised in&nbsp;
            <button
              onClick={() => this.setState({ raised: 'eth' })}
              className={raised === 'eth' ? s.activeCurrencyButton : s.currencybutton}>ETH</button>&nbsp;•&nbsp;
            <button
              onClick={() => this.setState({ raised: 'btc' })}
              className={raised === 'btc' ? s.activeCurrencyButton : s.currencybutton}>BTC</button>&nbsp;•&nbsp;
            <button
              onClick={() => this.setState({ raised: 'usd' })}
              className={raised === 'usd' ? s.activeCurrencyButton : s.currencybutton}>USD</button>
          </div>
        </div>

        <div className={s.block}>
          <div className={s.val}>{dashboard.daysLeft}</div>
          <div className={s.label}>Days to go</div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    dashboard: state.dashboard.dashboard
  }),
  {
    openMakeDepositPopup
  }
)(BalanceInfo);
