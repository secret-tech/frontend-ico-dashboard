import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import BigNum from 'bignumber.js';
import { translate } from 'react-i18next';
import s from './styles.css';

import { ethInvest } from '../../../utils/validators';

import { changeEth, setEth, openMnemonicPopup, setEthAmount } from '../../../redux/modules/dashboard/buyTokens';
import { openKycAlertPopup } from '../../../redux/modules/app/kycAlertPopup';
import { openTxFeeHelp } from '../../../redux/modules/dashboard/txFeeHelp';

import MnemonicPopup from '../MnemonicPopup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class BuyTokensForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: ''
    };

    this._investAllIn = this._investAllIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.ethValue || !nextProps.rate || !nextProps.expectedTxFee) {
      return;
    }

    const ethValue = new BigNum(nextProps.ethValue);
    const expectedTxFee = new BigNum(nextProps.expectedTxFee);
    const rate = new BigNum(nextProps.rate);
    const minInvest = new BigNum(0.1);

    if (ethValue.toNumber() && ethValue.greaterThanOrEqualTo(minInvest)) {
      const jcr = ethValue.dividedBy(rate).toFixed(3);
      const ethAmount = ethValue.plus(expectedTxFee);
      this.props.change('jcr', jcr);
      this.props.setEthAmount(ethAmount.toString());
      this.setState({ buttonText: ` for ${ethAmount.toString()} ETH` });
    } else {
      this.props.change('jcr', '');
      this.setState({ buttonText: '' });
    }
  }

  _investAllIn() {
    const ethBalance = new BigNum(this.props.ethBalance);
    const expectedTxFee = new BigNum(this.props.expectedTxFee);
    const rate = new BigNum(this.props.rate);
    const maxInvest = ethBalance.minus(expectedTxFee);
    const minInvest = new BigNum(0.1);
    const jcr = maxInvest.dividedBy(rate).toFixed(3);
    this.setState({ ethAmount: ethBalance.toString() });

    if (ethBalance.greaterThanOrEqualTo(minInvest)) {
      this.setState({ buttonText: ` for ${ethBalance.toString()}` });
      this.props.setEth(maxInvest.toString());
      this.props.change('eth', maxInvest.toString());
      this.props.change('jcr', jcr);
    } else {
      this.setState({ buttonText: '' });
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
      openTxFeeHelp
    } = this.props;

    const renderButton = () => {
      if (kycStatus === 'verified') {
        return (
          <Button
            onClick={() => openMnemonicPopup()}
            disabled={invalid}
            spinner={spinner}>{t('purchaseTokens')}{this.state.buttonText}</Button>
        );
      }

      return (
        <Button
          disabled={invalid}
          onClick={() => openKycAlertPopup()}>{t('purchaseTokens')}{this.state.buttonText}</Button>
      );
    };

    const renderIfAvailable = (num) => {
      if (num) return Number(num).toFixed(5);

      return 0;
    };

    return (
      <div className={s.form}>
        <div className={s.title}>{t('buyTokens')}</div>
        <form>
          <div className={s.field}>
            <Field
              component={RenderInput}
              onChange={(e) => changeEth(e.target.value)}
              tip="ETH"
              size="large"
              name="eth"
              placeholder="0 ETH"
              validate={ethInvest}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderInput}
              tip={t('tokenName')}
              size="large"
              name="jcr"
              placeholder={t('tokenBalanceValue', { amount: 0 })}
              disabled/>
          </div>

          <Field
            component={RenderInput}
            type="hidden"
            name="ethAmount"
            disabled/>

          <div className={s.gas}>
            <span title={expectedTxFee}>{t('gasFee')} {renderIfAvailable(expectedTxFee)} ETH</span>
            <span title={minInvest}>{t('minContribution')} {renderIfAvailable(minInvest)} ETH</span>
          </div>

          <div className={s.allIn}>
            <a onClick={this._investAllIn}>{t('contributeAll')}</a>
          </div>

          <div className={s.button}>
            {renderButton()}
          </div>
        </form>

        <div className={s.tip}>
          <p>
            {t('buyTokensTip_1')}<br/>
            {t('buyTokensTip_2')}
          </p>
          <p>
            {t('buyTokensTip_3')}<br/>
            <a onClick={() => openTxFeeHelp()}>{t('whatsTheGas')}</a>
          </p>
        </div>

        <MnemonicPopup/>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'buyTokens',
  initialValues: {
    eth: '',
    jcr: ''
  }
})(BuyTokensForm);

const TranslatedComponent = translate('dashboard')(FormComponent);

export default connect(
  (state) => ({
    spinner: state.dashboard.buyTokens.spinner,
    kycStatus: state.app.app.user.kycStatus,
    rate: state.dashboard.dashboard.jcrTokenPrice.ETH,
    expectedTxFee: state.dashboard.txFee.expectedTxFee,
    minInvest: state.dashboard.txFee.minInvest,
    ethValue: state.dashboard.buyTokens.eth,
    ethBalance: state.dashboard.dashboard.ethBalance
  }),
  {
    changeEth,
    openKycAlertPopup,
    openMnemonicPopup,
    setEthAmount,
    openTxFeeHelp,
    setEth
  }
)(TranslatedComponent);
