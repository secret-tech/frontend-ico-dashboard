import React, { Component } from 'react';
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

class SignUpForm extends Component {
  componentDidMount() {
    const { change } = this.props;

    const utmSource = window.localStorage.getItem('utm_source');
    const utmMedium = window.localStorage.getItem('utm_medium');
    const utmCampaign = window.localStorage.getItem('utm_campaign');
    const gtm = window.localStorage.getItem('gtm');

    change('source.utm_source', utmSource);
    change('source.utm_medium', utmMedium);
    change('source.utm_campaign', utmCampaign);
    change('source.gtm', gtm);
  }

  render() {
    const {
      spinner,
      handleSubmit,
      invalid,
      error,
      referralCode
    } = this.props;

    const renderReferralField = (code) => {
      if (code) {
        this.props.change('referral', code);
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
            placeholder="Referral code (optional)"/>
        </div>
      );
    };

    return (
      <div>
        <div className={s.title}>Sign Up</div>

        {error && <div className={s.error}>{error}</div>}

        <form id="mk_lk_signup" onSubmit={handleSubmit}>
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
              placeholder="E-mail"
              validate={emailValidate}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="password"
              type="password"
              placeholder="Password"
              validate={passwordValidate}/>
          </div>

          {renderReferralField(referralCode)}

          <div className={s.description}>
            Password must contain uppercase characters and only latin symbols and numbers.
          </div>

          <div className={s.checkbox}>
            <Field
              component={RenderCheckbox}
              label={<span>
                I agree with <a href="https://jincor.com/en/agreement" target="_blank">Terms of Services</a>
              </span>}
              name="agreeTos"
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
  }
}

const FormComponent = reduxForm({
  form: 'signUp',
  initialValues: {
    name: '',
    email: '',
    password: '',
    referral: '',
    agreeTos: false,
    source: {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      gtm: ''
    }
  }
})(SignUpForm);

export default FormComponent;
