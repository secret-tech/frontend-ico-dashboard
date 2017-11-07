import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import BalanceInfo from '../BalanceInfo';
import SendTokensForm from '../SendTokensForm';
import MnemonicPopup from '../MnemonicPopup';
import VerifySendTokensPopup from '../VerifySendTokensPopup';

class SendTokens extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.buyTokensForm}>
            <SendTokensForm/>
          </div>
        </div>
        <div className={s.col}>
          <BalanceInfo/>
        </div>

        <MnemonicPopup/>
        <VerifySendTokensPopup/>
      </div>
    );
  }
}

export default connect(null)(SendTokens);
