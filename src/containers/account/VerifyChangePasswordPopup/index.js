import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { required } from '../../../utils/validators';

import { closeVerifyChangePasswordPopup, verifyChangePassword } from '../../../redux/modules/account/changePassword';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class VerifyChangePassword extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      change,
      open,
      oldPassword,
      newPassword,
      verification
    } = nextProps;

    const { verificationId, method } = verification;

    if (open && oldPassword && newPassword && verificationId) {
      change('oldPassword', oldPassword);
      change('newPassword', newPassword);
      change('verification.verificationId', verificationId);
      change('verification.method', method);
    }
  }

  render() {
    const {
      open,
      handleSubmit,
      closeVerifyChangePasswordPopup,
      spinner,
      invalid,
      verification,
      error
    } = this.props;

    const { method } = verification;

    const renderTip = () => (
      method === 'email'
        ? 'We sent the code to your email address. Please, check your inbox or spam folder.'
        : 'Use Google Authenticator to get confirmation code.'
    );

    return (
      <Popup
        title="Verify change password"
        open={open}
        close={() => closeVerifyChangePasswordPopup()}>

        <div className={s.body}>
          <div className={s.description}>{renderTip()}</div>

          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(verifyChangePassword)}>
            <FormSection name="verification">
              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="code"
                  placeholder="Verification code"
                  validate={required}/>
              </div>

              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="method"
                  type="hidden"/>
              </div>

              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="verificationId"
                  type="hidden"/>
              </div>
            </FormSection>

            <div className={s.field}>
              <Field
                component={RenderInput}
                name="oldPassword"
                type="hidden"/>
            </div>

            <div className={s.field}>
              <Field
                component={RenderInput}
                name="newPassword"
                type="hidden"/>
            </div>

            <div className={s.button}>
              <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
            </div>
          </form>
        </div>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'verifyChangePassword',
  initialValues: {
    oldPassword: '',
    newPassword: '',
    verification: {
      verificationId: '',
      code: ''
    }
  }
})(VerifyChangePassword);

export default connect(
  (state) => ({
    open: state.account.changePassword.verifyPopupOpen,
    oldPassword: state.account.changePassword.oldPassword,
    newPassword: state.account.changePassword.newPassword,
    verification: state.account.changePassword.verification,
    spinner: state.account.changePassword.spinner
  }),
  {
    closeVerifyChangePasswordPopup
  }
)(FormComponent);
