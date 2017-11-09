import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchDashboard } from '../../../redux/modules/dashboard/dashboard';

import BuyTokensForm from '../BuyTokensForm';
import BalanceInfo from '../BalanceInfo';
import VerifyBuyTokensPopup from '../VerifyBuyTokensPopup';
// import AlternativeDashboard from '../AlternativeDasboard';
// import AlternativeBalanceInfo from '../AlternativeBalanceInfo';

class Dashboard extends Component {
  componentWillMount() {
    const { fetchDashboard } = this.props;

    fetchDashboard();
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
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchDashboard
  }
)(Dashboard);
