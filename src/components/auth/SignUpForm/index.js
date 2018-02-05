import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
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
import Globals from '../../../locales/globals';

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
      t,
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
            placeholder={t('referralCode')}/>
        </div>
      );
    };

    return (
      <div>
        <div className={s.title}>{t('signUp')}</div>

        {error && <div className={s.error}>{error}</div>}

        <form id="mk_lk_signup" onSubmit={handleSubmit}>
          <div className={s.field}>
            <Field
              component={RenderInput}
              name="name"
              type="text"
              placeholder={t('fullName')}
              validate={fullNameValidate}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderInput}
              name="email"
              type="text"
              placeholder={t('email')}
              validate={emailValidate}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="password"
              type="password"
              placeholder={t('password')}
              validate={passwordValidate}/>
          </div>

          {renderReferralField(referralCode)}

          <div className={s.description}>
            {t('passwordLengthDescription')}
          </div>

          <div className={s.checkbox}>
            <Field
              component={RenderCheckbox}
              label={<span>
                {t('iAgreeWith')} <a href={Globals.agreementLink} target="_blank">{t('termsOfServices')}</a>
              </span>}
              name="agreeTos"
              validate={required}/>
          </div>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>{t('submit')}</Button>
          </div>
        </form>

        <div className={s.footer}>
          <Link to={namedRoutes.signIn}>{t('signIn')}</Link> {t('ifYouHaveAccount')}
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

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
