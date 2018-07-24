import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { emailValidate, passwordValidate } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderPassword from '../../_forms/RenderPassword';

const InitSignInForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        component={RenderInput}
        large
        placeholder={t('signIn.form.initSignIn.email')}
        validate={emailValidate}/>

      <Field
        name="password"
        component={RenderPassword}
        large
        placeholder={t('signIn.form.initSignIn.password')}
        validate={passwordValidate}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('signIn.form.initSignIn.submit')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'initSignIn',
  initialValues: {
    email: '',
    password: ''
  }
})(InitSignInForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
