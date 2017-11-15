import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchDashboard } from '../../../redux/modules/dashboard/dashboard';

import BuyTokensForm from '../BuyTokensForm';
import BalanceInfo from '../BalanceInfo';
import VerifyBuyTokensPopup from '../VerifyBuyTokensPopup';
import AlternativeDashboard from '../AlternativeDasboard';
import AlternativeBalanceInfo from '../AlternativeBalanceInfo';

const { ICO_STARTS } = process.env;
const ICO_STARTS_JS = new Date(ICO_STARTS * 1000);
const ENABLE_TIMER = new Date(ICO_STARTS_JS - (60 * 60 * 1000));
const DISABLE_TIMER = new Date(ICO_STARTS_JS + (10 * 60 * 1000));

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

    if (currentTime > ICO_STARTS_JS) {
      this.setState({ icoStarted: true });
    }

    if (currentTime > ENABLE_TIMER && currentTime < DISABLE_TIMER) {
      setInterval(this._tick, 1000);
    }
  }

  _tick() {
    const currentTime = new Date();
    this.setState({ currentTime });

    if (currentTime > ICO_STARTS_JS) {
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
