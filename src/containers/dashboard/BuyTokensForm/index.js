import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { ethInvest, jcrInvest } from '../../../utils/validators';

import { changeEth, changeJcr, openMnemonicPopup } from '../../../redux/modules/dashboard/buyTokens';
import { openKycAlertPopup } from '../../../redux/modules/app/kycAlertPopup';

import MnemonicPopup from '../MnemonicPopup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class BuyTokensForm extends Component {
  render() {
    const {
      spinner,
      invalid,
      changeEth,
      changeJcr,
      openMnemonicPopup,
      kycStatus,
      openKycAlertPopup,
      rate
    } = this.props;

    const renderButton = () => {
      if (kycStatus === 'verified') {
        return (
          <Button
            onClick={() => openMnemonicPopup()}
            disabled={invalid}
            spinner={spinner}>Purchase tokens</Button>
        );
      }

      return (
        <Button
          disabled={invalid}
          onClick={() => openKycAlertPopup()}>Purchase tokens</Button>
      );
    };

    return (
      <div className={s.form}>
        <div className={s.title}>Buy Tokens</div>
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
              onChange={(e) => changeJcr(e.target.value)}
              tip="JCR"
              size="large"
              name="jcr"
              placeholder="0 JCR"
              disabled
              validate={jcrInvest(rate)}/>
          </div>

          <div className={s.button}>
            {renderButton()}
          </div>
        </form>

        <div className={s.tip}>
          <p>
            Now you can purchase JCR tokens with ETH.<br/>
            Use this calculator to evaluate the transaction rates.
          </p>
          <p>
            Enter the number of JCR tokens you want to purchase and find out the amount
            of ETH you will need to deposit in your account wallet to make the transaction.
            Add a little bit on top to cover the gas fee.
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

export default connect(
  (state) => ({
    spinner: state.dashboard.buyTokens.spinner,
    kycStatus: state.app.app.user.kycStatus,
    rate: state.dashboard.dashboard.jcrTokenPrice.ETH
  }),
  {
    changeJcr,
    changeEth,
    openKycAlertPopup,
    openMnemonicPopup
  }
)(FormComponent);
