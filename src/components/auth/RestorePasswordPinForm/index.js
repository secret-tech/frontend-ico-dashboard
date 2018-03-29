import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RestorePasswordPinForm = (props) => {
  const {
    t,
    spinner,
    method,
    invalid,
    error,
    handleSubmit
  } = props;

  const renderTip = () => (
    method === 'email'
      ? t('confirmEmailDescription')
      : t('confirmGoogleAuthDescription')
  );

  return (
    <div>
      <div className={s.title}>{t('passwordRecovery')}</div>
      <div className={s.description}>{renderTip()}</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="pin"
            type="text"
            placeholder={t('enterVerificationCode')}
            validate={twoFactorCode}/>
        </div>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={invalid}>{t('submit')}</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordPinForm',
  initialValues: {
    pin: ''
  }
})(RestorePasswordPinForm);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
