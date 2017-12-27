import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchDashboard } from '../../../redux/modules/dashboard/dashboard';
import { fetchFee } from '../../../redux/modules/dashboard/txFee';

import BuyTokensForm from '../BuyTokensForm';
import BalanceInfo from '../BalanceInfo';
import VerifyBuyTokensPopup from '../VerifyBuyTokensPopup';
import TxFeeHelp from '../TxFeeHelp';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchDashboard, fetchFee } = this.props;

    fetchDashboard();
    fetchFee();
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.buyTokensForm}>
            <BuyTokensForm/>
          </div>
        </div>
        <div className={s.col}>
          <BalanceInfo/>
        </div>

        <VerifyBuyTokensPopup/>
        <TxFeeHelp/>
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchDashboard,
    fetchFee
  }
)(Dashboard);
