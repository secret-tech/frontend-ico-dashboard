import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import {
  closeDisableTwoFactorAuthPopup,
  verifyDisableTwoFactorAuth
} from '../../../redux/modules/account/disableTwoFactorAuth';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

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
      invalid,
      error
    } = this.props;

    return (
      <Popup
        title={t('disableTwoFactorAuth')}
        open={open}
        close={() => closeDisableTwoFactorAuthPopup()}>

        <div className={s.body}>
          <div className={s.description}>{t('useGoogleAuth')}</div>

          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(verifyDisableTwoFactorAuth)}>
            <div className={s.field}>
              <Field
                component={RenderInput}
                name="code"
                placeholder={t('code')}
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
                disabled={invalid}>{t('disable')}</Button>
            </div>
          </form>
        </div>

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

const TranslatedComponent = translate('account')(FormComponent);

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
