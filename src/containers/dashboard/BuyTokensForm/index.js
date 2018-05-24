import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import BigNum from 'bignumber.js';
import { translate } from 'react-i18next';
import cx from 'classnames';
import { Icon, Intent } from '@blueprintjs/core';
import s from './styles.scss';

import { ethInvest } from '../../../utils/validators';
import { kycIsVerified } from '../../../utils/verification';

import { changeEth, setEth, openMnemonicPopup, setEthAmount, setTokens } from '../../../redux/modules/dashboard/buyTokens';
import { openKycAlertPopup } from '../../../redux/modules/app/kycAlertPopup';

import MnemonicPopup from '../MnemonicPopup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';
import * as routes from '../../../routes';

// TODO require refactoring

class BuyTokensForm extends Component {
  constructor(props) {
    super(props);

    this._investAllIn = this._investAllIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.ethValue || !nextProps.rate || !nextProps.expectedTxFee) {
      this.props.setTokens('');
      return;
    }

    const ethValue = new BigNum(nextProps.ethValue);
    const expectedTxFee = new BigNum(nextProps.expectedTxFee);
    const rate = new BigNum(nextProps.rate);
    const minInvest = new BigNum(0.1);

    if (ethValue.toNumber() && ethValue.isGreaterThanOrEqualTo(minInvest)) {
      const tokens = ethValue.dividedBy(rate).toFixed(3);
      const ethAmount = ethValue.plus(expectedTxFee);
      this.props.setTokens(tokens);
      this.props.setEthAmount(ethAmount.toString());
    } else {
      this.props.setTokens('');
    }
  }

  _investAllIn() {
    const ethBalance = new BigNum(this.props.ethBalance);
    const expectedTxFee = new BigNum(this.props.expectedTxFee);
    const rate = new BigNum(this.props.rate);
    const maxInvest = ethBalance.minus(expectedTxFee);
    const minInvest = new BigNum(0.1);
    const tokens = maxInvest.dividedBy(rate).toFixed(3);
    this.setState({ ethAmount: ethBalance.toString() });

    if (ethBalance.isGreaterThanOrEqualTo(minInvest)) {
      this.props.setEth(maxInvest.toString());
      this.props.change('eth', maxInvest.toString());
      this.props.setTokens(tokens);
    }
  }

  render() {
    const {
      t,
      spinner,
      invalid,
      changeEth,
      openMnemonicPopup,
      kycStatus,
      openKycAlertPopup,
      expectedTxFee,
      minInvest,
      ethValue,
      tokensValue
    } = this.props;

    const renderButton = () => {
      if (kycIsVerified(kycStatus)) {
        return (
          <Button
            onClick={() => openMnemonicPopup()}
            disabled={invalid}
            spinner={spinner}>{t('buyTokensForm.contribute')}</Button>
        );
      }

      return (
        <Button
          disabled={invalid}
          onClick={() => openKycAlertPopup()}>{t('buyTokensForm.contribute')}</Button>
      );
    };

    const renderIfAvailable = (num) => {
      if (num) return Number(num).toFixed(5);

      return 0;
    };

    const renderVerificationAlert = () => {
      if (!kycIsVerified(kycStatus)) {
        return (
          <div className={cx(s.alert, 'pt-callout pt-intent-danger')}>
            <Icon icon='info-sign' intent={Intent.DANGER} className={s.tipIcon} />
            {t('buyTokensForm.verificationAlert.message')} <a href={routes.KYC_VERIFICATION}>{t('buyTokensForm.verificationAlert.link')}</a>
          </div>
        );
      }

      return null;
    };

    const renderContributionAlert = () => (
      <div className={cx(s.alert, 'pt-callout pt-intent-primary')}>
        <Icon icon='info-sign' intent={Intent.PRIMARY} className={s.tipIcon} />
        <a href="https://t.me/el_tonyl" target="_blank">Contact us</a> if you need a dashboard like this for your crowdsale
      </div>
    );

    return (
      <div className={s.form}>
        <h2>Buy SPACE tokens</h2>

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
              component={RenderInput}
              onChange={(e) => changeEth(e.target.value)}
              tip="ETH"
              size="large"
              name="eth"
              placeholder="0 ETH"
              validate={ethInvest} />
          </div>

          <div className={s.button}>
            {renderButton()}
          </div>

          <Field
            component={RenderInput}
            type="hidden"
            name="ethAmount"
            disabled />
        </form>

        <div className={s.tipSection}>
          <div className={cx(s.total, { [s.hidden]: !tokensValue || invalid })}>
            {t('buyTokensForm.tip', { ethAmount: ethValue, tokensAmount: tokensValue })}
          </div>
          <div className={cx(s.gas, 'pt-text-muted')}>
            <span title={expectedTxFee}>{t('buyTokensForm.gasFee')} {renderIfAvailable(expectedTxFee)} ETH</span>
            <span title={minInvest}>{t('buyTokensForm.minContribution')} {renderIfAvailable(minInvest)} ETH</span>
          </div>
          <div className={s.alertsSection}>
            {renderVerificationAlert()}
            {renderContributionAlert()}
          </div>
        </div>

        <MnemonicPopup />
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'buyTokens',
  initialValues: {
    eth: ''
  }
})(BuyTokensForm);

const TranslatedComponent = translate('dashboard')(FormComponent);

export default connect(
  (state) => ({
    spinner: state.dashboard.buyTokens.spinner,
    kycStatus: state.app.app.user.kycStatus,
    rate: state.dashboard.dashboard.tokenPrice.ETH,
    expectedTxFee: state.dashboard.txFee.expectedTxFee,
    minInvest: state.dashboard.txFee.minInvest,
    ethValue: state.dashboard.buyTokens.eth,
    tokensValue: state.dashboard.buyTokens.tokens,
    ethBalance: state.dashboard.dashboard.ethBalance
  }),
  {
    changeEth,
    openKycAlertPopup,
    openMnemonicPopup,
    setEthAmount,
    setEth,
    setTokens
  }
)(TranslatedComponent);
