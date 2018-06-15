import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import classnames from 'classnames/bind';

import { changeEth, openMnemonicPopup } from '../../../redux/modules/dashboard/buyTokens';

import RenderInput from '../../../components/_forms/RenderInput';

import config from '../../../utils/config';
import { ethContribute } from '../../../utils/validators';
import { tokenCalc } from '../../../utils/numbers';
import s from './styles.scss';

const cx = classnames.bind(s);

class ContributeForm extends Component {
  render() {
    const {
      openMnemonicPopup,

      eth,
      rate,
      txFeeFetching,
      expectedTxFee,
      minInvest,
      invalid
    } = this.props;

    return (
      <div>
        <h2>Contribution</h2>

        <div>
          <p>
            On this screen, you can purchase SPACE tokens with ETH in Ropsten testnet.
            Use the calculator below to evaluate sum for the desired amount of tokens.
          </p>
          <p>
            Just input the amount of ETH you want to contribute and find out the number of SPACE tokens you will get. Please note that a little ETH adding on top to cover the gas fee. <a href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html" target="_blank">What is gas fee?</a>
          </p>
        </div>

        <form>
          <div className={s.field}>
            <Field
              name="eth"
              large
              fill
              component={RenderInput}
              placeholder="ex: 10.014584"
              tip="Enter the value in ethers (ETH)"
              onChange={(e) => this.props.changeEth(e.target.value)}
              value={eth}
              validate={ethContribute}/>
          </div>

          <div className={s.tips}>
            <div className="pt-text-muted">
              Expected transaction fee: <b className={cx(s.tipValue, txFeeFetching && 'pt-skeleton')}>{expectedTxFee}</b> ETH
            </div>
            <div className="pt-text-muted">
              Minimum available contribution: <b className={cx(s.tipValue, txFeeFetching && 'pt-skeleton')}>{minInvest}</b> ETH
            </div>
          </div>

          <div className={s.calc}>
            {eth >= config.minEthContribution
              ? <div>You are buying ~<b>{tokenCalc(eth, rate)}</b> SPACE tokens for <b>{eth}</b> ETH</div>
              : null}
          </div>

          <div className={s.button}>
            <Button
              large
              rightIcon="arrow-right"
              intent={Intent.PRIMARY}
              disabled={invalid}
              onClick={() => openMnemonicPopup()}>
              Confirm contribution
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'contribute'
})(ContributeForm);

const TranslatedComponent = translate('dashboard')(FormComponent);
const ConnectedComponent = connect(
  (state) => ({
    txFeeFetching: state.dashboard.txFee.fetching,
    expectedTxFee: state.dashboard.txFee.expectedTxFee,
    minInvest: state.dashboard.txFee.minInvest,
    eth: state.dashboard.buyTokens.eth,
    rate: state.dashboard.dashboard.tokenPrice.ETH
  }),
  {
    changeEth,
    openMnemonicPopup
  }
)(TranslatedComponent);

export default ConnectedComponent;
