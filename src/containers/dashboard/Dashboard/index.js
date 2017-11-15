import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchDashboard } from '../../../redux/modules/dashboard/dashboard';

import BuyTokensForm from '../BuyTokensForm';
import BalanceInfo from '../BalanceInfo';
import VerifyBuyTokensPopup from '../VerifyBuyTokensPopup';
import AlternativeDashboard from '../AlternativeDasboard';
import AlternativeBalanceInfo from '../AlternativeBalanceInfo';

const ICO_START = new Date('Dec 1, 2017 00:00:00 GMT+0300').getTime();
const ENABLE_TIMER = new Date(ICO_START - (60 * 60 * 1000));
const DISABLE_TIMER = new Date(ICO_START + (10 * 60 * 1000));

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      icoStarted: false
    };

    this._tick = this._tick.bind(this);
  }

  componentWillMount() {
    const { fetchDashboard } = this.props;

    fetchDashboard();

    const currentTime = new Date();

    if (currentTime > ENABLE_TIMER && currentTime < DISABLE_TIMER) {
      setInterval(this._tick, 1000);
    }
  }

  _tick() {
    const currentTime = new Date();
    this.setState({ currentTime });

    if (currentTime > ICO_START) {
      this.setState({ icoStarted: true });
    }
  }

  render() {
    const { icoStarted } = this.state;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.buyTokensForm}>
            {icoStarted ? <BuyTokensForm/> : <AlternativeDashboard/>}
          </div>
        </div>
        <div className={s.col}>
          {icoStarted ? <BalanceInfo/> : <AlternativeBalanceInfo/>}
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
