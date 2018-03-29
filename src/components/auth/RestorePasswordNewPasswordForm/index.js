import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { translate } from 'react-i18next';
import s from './styles.css';

import { passwordValidate } from '../../../utils/validators';

import RenderPassword from '../../forms/RenderPassword';
import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

class RestorePasswordNewPasswordForm extends Component {
  componentWillMount() {
    const {
      change,
      code,
      email,
      verification
    } = this.props;

    const { verificationId, method } = verification;

    change('email', email);
    change('verification.code', code);
    change('verification.verificationId', verificationId);
    change('verification.method', method);
  }

  render() {
    const {
      t,
      spinner,
      invalid,
      error,
      handleSubmit
    } = this.props;

    return (
      <div>
        <div className={s.title}>{t('passwordRecovery')}</div>

        {error && <div className={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="password"
              type="password"
              placeholder={t('enterNewPassword')}
              validate={passwordValidate}/>
          </div>

          <Field
            component={RenderInput}
            name="email"
            type="hidden"
            disabled/>

          <FormSection name="verification">
            <Field
              component={RenderInput}
              name="verificationId"
              type="hidden"
              disabled/>

            <Field
              component={RenderInput}
              name="code"
              type="hidden"
              disabled/>

            <Field
              component={RenderInput}
              name="method"
              type="hidden"
              disabled/>
          </FormSection>

          <div className={s.description}>
            {t('passwordLengthDescription')}
          </div>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>{t('submit')}</Button>
          </div>
        </form>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'restorePasswordPassForm',
  initialValues: {
    email: '',
    password: '',
    verification: {
      verificationId: '',
      code: '',
      method: ''
    }
  }
})(RestorePasswordNewPasswordForm);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
