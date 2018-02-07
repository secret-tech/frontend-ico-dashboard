import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
      t,
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
        title={t('enableTwoFactorAuth')}
        open={open}
        close={() => closeEnableTwoFactorAuthPopup()}>

        <div className={s.body}>
          <div className={s.description}>
            {t('twoAuthDescription')}
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
                disabled={invalid}>{t('enable')}</Button>
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

const TranslatedComponent = translate('account')(FormComponent);

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
