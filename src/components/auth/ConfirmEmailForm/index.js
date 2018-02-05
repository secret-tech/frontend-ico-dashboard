import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import s from './styles.css';

import { required } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

class ConfirmEmailForm extends Component {
  componentWillMount() {
    const {
      email,
      verificationId,
      code
    } = this.props;
    this.props.change('verificationId', verificationId);
    this.props.change('email', email);

    if (code !== '') {
      this.props.change('code', code);
    }
  }

  render() {
    const {
      t,
      spinner,
      handleSubmit,
      invalid,
      error
    } = this.props;

    return (
      <div>
        <div className={s.title}>{t('signUp')}</div>

        <div className={s.description}>
          {t('confirmEmailDescription')}
        </div>

        {error && <div className={s.error}>{error}</div>}

        <form id="mk_lk_signup_confirm" onSubmit={handleSubmit}>
          <div className={s.field}>
            <Field
              component={RenderInput}
              name="code"
              type="text"
              placeholder={t('enterPin')}
              validate={required}/>
          </div>

          <Field
            component={RenderInput}
            name="email"
            type="hidden"
            disabled/>

          <Field
            component={RenderInput}
            name="verificationId"
            type="hidden"
            disabled/>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>{t('submit')}</Button>
          </div>
        </form>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'verifySignUp',
  initialValues: {
    code: '',
    email: '',
    verificationId: ''
  }
})(ConfirmEmailForm);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
