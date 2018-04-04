import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import cx from 'classnames';
import s from './styles.css';
import { bigNum } from '../../../helpers/common/common';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Button from '../../../components/common/Button';

class BalanceInfo extends Component {
  render() {
    const { t, openMakeDepositPopup, dashboard } = this.props;

    return (
      <div className={cx('pt-card', 'pt-elevation-2', s.balance)}>
        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.ethBalance)}</div>
          <div className={s.label}>{t('ethBalance')}</div>
        </div>

        <div className={s.block}>
          <div className={s.val}>{bigNum(dashboard.jcrTokenBalance, 2)}</div>
          <div className={s.label}>{t('tokenBalance')}</div>
        </div>

        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>{t('makeDeposit')}</Button>
        </div>
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
