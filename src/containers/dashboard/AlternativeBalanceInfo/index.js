import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';
import { bigNum } from '../../../helpers/common/common';

class AlternativeBalanceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 'eth',
      raised: 'eth'
    };
  }

  render() {
    const { t, dashboard } = this.props;
    const { rate } = this.state;

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

    return (
      <div className={s.balance}>
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
      </div>
    );
  }
}

const TranslatedComponent = translate('dashboard')(AlternativeBalanceInfo);

export default connect((state) => ({
  dashboard: state.dashboard.dashboard
}))(TranslatedComponent);
