import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import s from './styles.css';

import { namedRoutes } from '../../../routes';
import { emailValidate, passwordValidate } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import RenderPassword from '../../forms/RenderPassword';
import Button from '../../common/Button';

const SignUpForm = (props) => {
  const { spinner, handleSubmit, invalid, error } = props;

  return (
    <div>
      <div className={s.title}>Sign Up</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="text"
            placeholder="e-mail"
            validate={emailValidate}/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderPassword}
            name="password"
            type="password"
            placeholder="password"
            validate={passwordValidate}/>
        </div>

        <div className={s.password}>
          <Link to={namedRoutes.password}>I forgot my password</Link>
        </div>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
        </div>
      </form>

      <div className={s.footer}>
        <Link to={namedRoutes.signIn}>Sign In</Link> if you have an account
      </div>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'signUn',
  initialValues: {
    email: '',
    password: '',
    passwordConfirm: ''
  }
})(SignUpForm);

export default FormComponent;
