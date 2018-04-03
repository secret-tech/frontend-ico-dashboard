import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import cx from 'classnames';
import s from './styles.scss';
import { bigNum } from '../../../helpers/common/common';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

class BalanceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 'eth',
      raised: 'eth'
    };
  }

  render() {
    const { t, dashboard } = this.props;
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
      <div className={cx('pt-card', 'pt-dark', 'pt-elevation-2', s.container)}>
        <div className={s.block}>
          {renderRate(rate)}
          <div className={s.label}>
            {t('perToken')}&nbsp;
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
