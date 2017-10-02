import React from 'react';
import { reduxForm, Field } from 'redux-form';

import RenderInput from '../../forms/RenderInput';

const SignInForm = (props) => {
  const { invalid } = props;
  console.log(invalid);

  return (
    <form>
      <Field
        component={RenderInput}
        name="email"
        type="text"
        placeholder="e-mail"/>

      <Field
        component={RenderInput}
        name="password"
        type="password"
        placeholder="password"/>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'signIn',
  initialValues: {
    email: '',
    password: ''
  }
})(SignInForm);

export default FormComponent;
