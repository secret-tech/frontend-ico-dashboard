import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import cx from 'classnames';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import {
  closeEnableTwoFactorAuthPopup,
  verifyEnableTwoFactorAuth
} from '../../../redux/modules/settings/enableTwoFactorAuth';

import Popup from '../../../containers/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';

// TODO requires refactor.
// This component must be stateless. Remove change()
// Pass props in initialValues
// Add i18n

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
      t,
      open,
      handleSubmit,
      closeEnableTwoFactorAuthPopup,
      spinner,
      verification,
      invalid
    } = this.props;

    const {
      qrPngDataUri
    } = verification;

    return (
      <Popup
        title={t('enable2faPopup.title')}
        open={open}
        close={() => closeEnableTwoFactorAuthPopup()}
        style={{ width: '300px' }}>

        <div className={cx(s.description, 'pt-text-muted')}>
          {t('enable2faPopup.description')}
        </div>

        <div className={s.qr}>
          <img src={qrPngDataUri} />
        </div>

        <form onSubmit={handleSubmit(verifyEnableTwoFactorAuth)}>
          <Field
            component={RenderInput}
            name="code"
            placeholder={t('enable2faPopup.code')}
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
            disabled={invalid}>{t('enable2faPopup.submit')}</Button>
        </form>
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

const TranslatedComponent = translate('settings')(FormComponent);

export default connect(
  (state) => ({
    open: state.account.enableTwoFactorAuth.enableTwoFactorAuthPopupOpen,
    spinner: state.account.enableTwoFactorAuth.spinner,
    verification: state.account.enableTwoFactorAuth.verification
  }),
  {
    closeEnableTwoFactorAuthPopup
  }
)(TranslatedComponent);
