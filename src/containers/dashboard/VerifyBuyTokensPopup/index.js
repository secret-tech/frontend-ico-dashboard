import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import { closeVerifyPopup, verifyBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class VerifyBuyTokensPopup extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      change,
      open,
      ethAmount,
      method,
      mnemonic,
      verificationId
    } = nextProps;

    if (open && ethAmount && method && verificationId) {
      change('ethAmount', ethAmount);
      change('mnemonic', mnemonic);
      change('verification.verificationId', verificationId);
      change('verification.method', method);
    }
  }

  render() {
    const {
      open,
      handleSubmit,
      closeVerifyPopup,
      method,
      spinner,
      invalid,
      error
    } = this.props;

    const renderTip = () => (
      method === 'email'
        ? 'We sent the code to your email address. Please, check your inbox or spam folder.'
        : 'Use Google Authenticator to get confirmation code.'
    );

    return (
      <Popup
        title="Verify JCR Purchase"
        open={open}
        close={() => closeVerifyPopup()}>

        <div className={s.body}>
          <div className={s.description}>{renderTip()}</div>

          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(verifyBuyTokens)}>
            <FormSection name="verification">
              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="code"
                  placeholder="Verification code"
                  validate={twoFactorCode}/>
              </div>

              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="verificationId"
                  type="hidden"/>
              </div>

              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="method"
                  type="hidden"/>
              </div>
            </FormSection>

            <Field
              component={RenderInput}
              name="ethAmount"
              type="hidden"/>

            <div className={s.button}>
              <Button type="submit" spinner={spinner} disabled={invalid}>Purchase</Button>
            </div>
          </form>
        </div>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'buyTokensVerify',
  initialValues: {
    ethAmount: 0,
    mnemonic: '',
    verification: {
      verificationId: '',
      code: '',
      method: 'email'
    }
  }
})(VerifyBuyTokensPopup);

export default connect(
  (state) => ({
    open: state.dashboard.buyTokens.verifyPopupOpen,
    spinner: state.dashboard.buyTokens.spinner,
    mnemonic: state.dashboard.buyTokens.mnemonic,
    ethAmount: state.dashboard.buyTokens.eth,
    verificationId: state.dashboard.buyTokens.verification.verificationId,
    method: state.dashboard.buyTokens.verification.method
  }),
  {
    closeVerifyPopup
  }
)(FormComponent);
