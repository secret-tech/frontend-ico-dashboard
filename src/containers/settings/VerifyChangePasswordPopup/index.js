import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import cx from 'classnames';
import s from './styles.css';

import { required } from '../../../utils/validators';

import { closeVerifyChangePasswordPopup, verifyChangePassword } from '../../../redux/modules/settings/changePassword';

import Popup from '../../../containers/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';

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
      t,
      open,
      handleSubmit,
      closeVerifyChangePasswordPopup,
      spinner,
      invalid,
      verification
    } = this.props;

    const { method } = verification;

    const renderTip = () => (
      method === 'email'
        ? t('emailConfirmationTip')
        : t('googleAuthConfirmationTip')
    );

    return (
      <Popup
        title={t('changePassword')}
        open={open}
        close={() => closeVerifyChangePasswordPopup()}
        style={{ width: '300px' }}>
        <div className={cx(s.description, 'pt-text-muted')}>{renderTip()}</div>
        <form onSubmit={handleSubmit(verifyChangePassword)}>
          <FormSection name="verification">
            <Field
              component={RenderInput}
              name="code"
              placeholder={t('verificationCode')}
              validate={required} />

            <Field
              component={RenderInput}
              name="method"
              type="hidden" />

            <Field
              component={RenderInput}
              name="verificationId"
              type="hidden" />
          </FormSection>

          <Field
            component={RenderInput}
            name="oldPassword"
            type="hidden" />

          <Field
            component={RenderInput}
            name="newPassword"
            type="hidden" />

          <Button className="pt-fill" type="submit" intent={Intent.PRIMARY} loading={spinner} disabled={invalid}>
            {t('verifyChangePassword')}
          </Button>
        </form>
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

const TranslatedComponent = translate('settings')(FormComponent);

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
)(TranslatedComponent);
