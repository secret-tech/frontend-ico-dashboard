import React, { Component } from 'react';
import s from './styles.css';

class BalanceBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1
    };

    this._handleChangeTab = this._handleChangeTab.bind(this);
  }

  _handleChangeTab(newTabIndex) {
    this.setState({ tabIndex: newTabIndex });
  }

  render() {
    return (
      <div className={s.block}>
        <div className={s.val}>0.0035 ETH</div>
        <div className={s.label}>
          Per JCR token in&nbsp;
          <span>
            <button className={s.activeCurrencyButton}>ETH</button>&nbsp;•&nbsp;
            <button className={s.currencybutton}>USD</button>
          </span>
        </div>
      </div>
    );
  }
}

export default BalanceBlock;
