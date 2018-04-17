import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import cx from 'classnames';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import {
  closeDisableTwoFactorAuthPopup,
  verifyDisableTwoFactorAuth
} from '../../../redux/modules/settings/disableTwoFactorAuth';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';

class DisableTwoFactorAuthPopup extends Component {
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
      t,
      open,
      handleSubmit,
      closeDisableTwoFactorAuthPopup,
      spinner,
      invalid
    } = this.props;

    return (
      <Popup
        title={t('disableTwoFactorAuth')}
        open={open}
        close={() => closeDisableTwoFactorAuthPopup()}
        style={{ width: '300px' }}>

        <div className={cx(s.description, 'pt-text-muted')}>{t('useGoogleAuth')}</div>

        <form onSubmit={handleSubmit(verifyDisableTwoFactorAuth)}>
          <Field
            component={RenderInput}
            name="code"
            placeholder={t('code')}
            validate={twoFactorCode} />

          <Field
            component={RenderInput}
            name="verificationId"
            type="hidden"
            disabled />

          <Field
            component={RenderInput}
            name="method"
            type="hidden"
            disabled />

          <Button
            className="pt-fill"
            type="submit"
            intent={Intent.PRIMARY}
            loading={spinner}
            disabled={invalid}>
            {t('disable')}
          </Button>
        </form>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'disableTwoFactorAuth',
  initialValues: {
    code: '',
    verificationId: '',
    method: ''
  }
})(DisableTwoFactorAuthPopup);

const TranslatedComponent = translate('settings')(FormComponent);

export default connect(
  (state) => ({
    open: state.account.disableTwoFactorAuth.disableTwoFactorAuthPopupOpen,
    spinner: state.account.disableTwoFactorAuth.spinner,
    verification: state.account.disableTwoFactorAuth.verification
  }),
  {
    closeDisableTwoFactorAuthPopup
  }
)(TranslatedComponent);
