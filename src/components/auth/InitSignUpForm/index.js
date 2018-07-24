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
      t,
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
            placeholder={t('signUp.form.initSignUp.referralCode')}/>
        )
        : (
          <div className={s.referralCodeButton}>
            <a onClick={() => this.setState({ showReferralInput: true })}>{t('signUp.form.initSignUp.haveReferralCode')}</a>
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
          placeholder={t('signUp.form.initSignUp.email')}
          validate={emailValidate}/>

        <Field
          name="password"
          component={RenderPassword}
          large
          placeholder={t('signUp.form.initSignUp.password')}
          validate={passwordValidate}
          tip={t('signUp.form.initSignUp.passwordTip')}/>

        {renderReferralInput()}

        <div>
          <Button
            type="submit"
            className="pt-large pt-fill"
            intent={Intent.PRIMARY}
            text={t('signUp.form.initSignUp.submit')}
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
