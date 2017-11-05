import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import { changeEth, changeJcr } from '../../../redux/modules/dashboard/buyTokens';

import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const BuyTokensForm = (props) => {
  const { changeEth, changeJcr, eth, jcr } = props;

  return (
    <div>
      <div className={s.title}>Buy Tokens</div>
      <form>
        <div className={s.field}>
          <Input
            onChange={(e) => changeEth(e.target.value)}
            value={eth}
            size="large"
            name="eth"
            placeholder="0 ETH Tokens"/>
        </div>

        <div className={s.field}>
          <Input
            onChange={(e) => changeJcr(e.target.value)}
            value={jcr}
            size="large"
            name="jcr"
            placeholder="0 JCR Tokens"/>
        </div>

        <div className={s.button}>
          <Button disabled={!Number(jcr)}>Buy tokens</Button>
        </div>
      </form>

      <div className={s.tip}>
        <p>
          You are able to buy JCR tokens using ETH or BTC.<br/>
          The calculator is provided for your convenience.
        </p>
        <p>
          You can enter a number of JCR tokens you wish to buy and calculate
          the amount you would need to have in your account wallet.
        </p>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    eth: state.dashboard.buyTokens.eth,
    jcr: state.dashboard.buyTokens.jcr
  }),
  {
    changeJcr,
    changeEth
  }
)(BuyTokensForm);
