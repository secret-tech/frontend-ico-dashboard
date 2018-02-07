import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import { closeVerifyPopup, verifySendTokens } from '../../../redux/modules/sendTokens/sendTokens';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class VerifySendTokensPopup extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const {
  //     change,
  //     open,
  //     ethAmount,
  //     mnemonic,
  //     method,
  //     verificationId
  //   } = nextProps;
  //
  //   if (open && ethAmount && mnemonic && method && verificationId) {
  //     change('ethAmount', ethAmount);
  //     change('mnemonic', mnemonic);
  //     change('verification.verificationId', verificationId);
  //     change('verification.method', method);
  //   }
  // }

  render() {
    const {
      t,
      open,
      handleSubmit,
      closeVerifyPopup,
      spinner,
      invalid,
      error
    } = this.props;

    return (
      <Popup
        title={t('verifyBuyingToken')}
        open={open}
        close={() => closeVerifyPopup()}>

        <div className={s.body}>
          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(verifySendTokens)}>
            <FormSection name="verification">
              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="code"
                  placeholder={t('verificationCode')}
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
              name="mnemonic"
              type="hidden"/>

            <Field
              component={RenderInput}
              name="ethAmount"
              type="hidden"/>

            <div className={s.button}>
              <Button type="submit" spinner={spinner} disabled={invalid}>{t('purchase')}</Button>
            </div>
          </form>
        </div>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'sendTokensVerify',
  initialValues: {
    ethAmount: 0,
    mnemonic: '',
    verification: {
      verificationId: '',
      code: '',
      method: 'email'
    }
  }
})(VerifySendTokensPopup);

const TranslatedComponent = translate('sendTokens')(FormComponent);

export default connect(
  (state) => ({
    open: state.sendTokens.sendTokens.verifyPopupOpen,
    spinner: state.sendTokens.sendTokens.spinner,
    ethAmount: state.sendTokens.sendTokens.eth,
    mnemonic: state.sendTokens.sendTokens.mnemonicPhrase,
    verificationId: state.sendTokens.sendTokens.verification.verificationId,
    method: state.sendTokens.sendTokens.verification.method
  }),
  {
    closeVerifyPopup
  }
)(TranslatedComponent);
