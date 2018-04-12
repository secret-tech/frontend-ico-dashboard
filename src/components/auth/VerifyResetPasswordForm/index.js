import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { required } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderPassword from '../../_forms/RenderPassword';

import s from './styles.scss';

const VerifyResetPasswordForm = (props) => {
  const {
    handleSubmit,
    invalid,
    fetching,
    method
  } = props;

  const renderTip = () => {
    if (!method) return null;

    return (
      <div className={s.tip}>
        To activate account - enter PIN code from email
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderTip()}

      <FormSection name="verification">
        <Field
          component={RenderInput}
          placeholder="Verification code"
          name="code"
          type="text"
          className="pt-input pt-large pt-fill"
          validate={required}/>
      </FormSection>

      <Field
        component={RenderPassword}
        placeholder="New password"
        name="password"
        type="password"
        className="pt-input pt-large pt-fill"
        size="pt-large"
        tip={true}
        validate={required}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text="Reset password"
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
