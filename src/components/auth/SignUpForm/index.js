import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import s from './styles.css';

import { namedRoutes } from '../../../routes';
import {
  emailValidate,
  passwordValidate,
  fullNameValidate,
  required
} from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import RenderPassword from '../../forms/RenderPassword';
import RenderCheckbox from '../../forms/RenderCheckbox';
import Button from '../../common/Button';

const SignUpForm = (props) => {
  const { spinner, handleSubmit, invalid, error, referralCode } = props;

  const renderReferralField = (code) => {
    if (code) {
      props.change('referral', code);
      return (
        <Field
          component={RenderInput}
          name="referral"
          type="hidden"
          disabled/>
      );
    }

    return (
      <div className={s.field}>
        <Field
          component={RenderInput}
          name="referral"
          type="text"
          placeholder="Referral code"/>
      </div>
    );
  };

  return (
    <div>
      <div className={s.title}>Sign Up</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="name"
            type="text"
            placeholder="Full name"
            validate={fullNameValidate}/>
        </div>

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

        {renderReferralField(referralCode)}

        <div className={s.checkbox}>
          <Field
            component={RenderCheckbox}
            label={<span>
              I agree with <a href="http://jincor.com" target="_blank">Terms of Services</a>
            </span>}
            name="agree"
            validate={required}/>
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
  form: 'signUp',
  initialValues: {
    name: '',
    email: '',
    password: '',
    referral: '',
    agree: false
  }
})(SignUpForm);

export default FormComponent;
