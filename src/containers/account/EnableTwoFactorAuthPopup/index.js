import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import {
  closeEnableTwoFactorAuthPopup,
  verifyEnableTwoFactorAuth
} from '../../../redux/modules/account/enableTwoFactorAuth';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class EnableTwoFactorAuthPopup extends Component {
  componentWillReceiveProps(nextProps) {
    const { change, open, verification } = nextProps;
    const { verificationId, method } = verification;

    if (open && verificationId && method) {
      change('verificationId', verificationId);
      change('method', method);
    }
  }

  render() {
    const {
      open,
      handleSubmit,
      closeEnableTwoFactorAuthPopup,
      spinner,
      verification,
      invalid,
      error
    } = this.props;

    const {
      qrPngDataUri
    } = verification;

    return (
      <Popup
        title="Enable Two-Factor Authentication"
        open={open}
        close={() => closeEnableTwoFactorAuthPopup()}>

        <div className={s.body}>
          <div className={s.description}>
            Scan the QR code with Google Authenticator app on your smartphone and enter
            the 6-digit PIN the app generated in order to enable 2FA.
          </div>

          <div className={s.qr}>
            <img src={qrPngDataUri}/>
          </div>

          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(verifyEnableTwoFactorAuth)}>
            <div className={s.field}>
              <Field
                component={RenderInput}
                name="code"
                placeholder="Code"
                validate={twoFactorCode}/>
            </div>

            <Field
              component={RenderInput}
              name="verificationId"
              type="hidden"
              disabled/>

            <Field
              component={RenderInput}
              name="method"
              type="hidden"
              disabled/>

            <div className={s.button}>
              <Button
                type="submit"
                spinner={spinner}
                disabled={invalid}>Enable</Button>
            </div>
          </form>
        </div>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'enableTwoFactorAuth',
  initialValues: {
    code: '',
    verificationId: '',
    method: ''
  }
})(EnableTwoFactorAuthPopup);

export default connect(
  (state) => ({
    open: state.account.enableTwoFactorAuth.enableTwoFactorAuthPopupOpen,
    spinner: state.account.enableTwoFactorAuth.spinner,
    verification: state.account.enableTwoFactorAuth.verification
  }),
  {
    closeEnableTwoFactorAuthPopup
  }
)(FormComponent);
