import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode, passwordValidate } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderPassword from '../../_forms/RenderPassword';
import VerifyTip from '../../common/VerifyTip';

import s from './styles.scss';

const VerifyResetPasswordForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching,
    method
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.tip}>
        <VerifyTip method={method}/>
      </div>

      <FormSection name="verification">
        <Field
          name="code"
          type="text"
          component={RenderInput}
          large
          placeholder={t('resetPassword.form.verifyResetPassword.code')}
          validate={twoFactorCode}/>
      </FormSection>

      <Field
        name="password"
        component={RenderPassword}
        large
        placeholder={t('resetPassword.form.verifyResetPassword.password')}
        validate={passwordValidate}
        tip={t('resetPassword.form.verifyResetPassword.passwordTip')}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('resetPassword.form.verifyResetPassword.submit')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifyResetPassword',
  initialValues: {
    email: '',
    password: '',
    verification: {
      verificationId: '',
      code: '',
      method: ''
    }
  }
})(VerifyResetPasswordForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
