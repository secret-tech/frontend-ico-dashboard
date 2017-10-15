import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import BuyTokensForm from '../../../components/dashboard/BuyTokensForm';
import BalanceInfo from '../BalanceInfo';

class Dashboard extends Component {
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
      </div>
    );
  }
}

export default connect(
  null
)(Dashboard);
