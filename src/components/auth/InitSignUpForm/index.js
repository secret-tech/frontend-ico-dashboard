import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { emailValidate, passwordValidate } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderPassword from '../../_forms/RenderPassword';

import s from './styles.scss';

class InitSignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReferralInput: false
    };
  }

  render() {
    const {
      handleSubmit,
      invalid,
      referral,
      fetching
    } = this.props;

    const renderReferralInput = () => {
      if (referral) return null;

      return this.state.showReferralInput
        ? (
          <Field
            name="referral"
            type="text"
            component={RenderInput}
            large
            placeholder="Referral code"/>
        )
        : (
          <div className={s.referralCodeButton}>
            <a onClick={() => this.setState({ showReferralInput: true })}>Have referral code?</a>
          </div>
        );
    };

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          component={RenderInput}
          large
          placeholder="Email"
          validate={emailValidate}/>

        <Field
          name="password"
          component={RenderPassword}
          large
          placeholder="Password"
          validate={passwordValidate}
          tip="Password must be at least 8 characters length, contain at least one number, one capital letter, one small letter. Special characters are allowed."/>

        {renderReferralInput()}

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
  }
}

const FormComponent = reduxForm({
  form: 'initSignUp',
  initialValues: {
    email: '',
    password: '',
    referral: '',
    agreeTos: true
  }
})(InitSignUpForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
