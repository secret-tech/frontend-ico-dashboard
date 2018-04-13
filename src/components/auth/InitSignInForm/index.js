import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { required } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderPassword from '../../_forms/RenderPassword';

const InitSignInForm = (props) => {
  const {
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={RenderInput}
        placeholder="Email"
        name="email"
        type="email"
        className="pt-input pt-large pt-fill"
        validate={required}/>

      <Field
        component={RenderPassword}
        placeholder="Password"
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
          text="Sign up"
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
