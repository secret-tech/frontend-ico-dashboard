import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import s from './styles.css';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const SignInForm = (props) => {
  const { invalid } = props;
  console.log(invalid);

  return (
    <div>
      <div className={s.title}>Sign In</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="text"
            placeholder="e-mail"/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderInput}
            name="password"
            type="password"
            placeholder="password"/>
        </div>

        <div className={s.password}>
          <Link to='/'>I forgot my password</Link>
        </div>

        <div className={s.button}>
          <Button>Submit</Button>
        </div>
      </form>

      <div className={s.footer}>
        <Link to='/'>Sign Up</Link> if you don’t have an account
      </div>
    </div>
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
