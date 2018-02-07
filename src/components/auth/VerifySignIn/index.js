import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { translate } from 'react-i18next';
import s from './styles.css';

import { required } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

class verifySignIn extends Component {
  componentWillMount() {
    const {
      change,
      method,
      verificationId,
      accessToken
    } = this.props;

    change('verification.id', verificationId);
    change('verification.method', method);
    change('accessToken', accessToken);
  }

  render() {
    const {
      t,
      spinner,
      method,
      handleSubmit,
      invalid,
      error
    } = this.props;

    const renderTip = () => (
      method === 'email'
        ? t('confirmEmailDescription')
        : t('confirmGoogleAuthDescription')
    );

    return (
      <div>
        <div className={s.title}>{t('verifySignIn')}</div>

        <div className={s.description}>{renderTip()}</div>

        {error && <div className={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormSection name="verification">
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
              name="id"
              type="hidden"
              disabled/>

            <Field
              component={RenderInput}
              name="method"
              type="hidden"
              disabled/>
          </FormSection>

          <Field
            component={RenderInput}
            name="accessToken"
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
  form: 'verifySignIn',
  initialValues: {
    accessToken: '',
    verification: {
      id: '',
      code: '',
      method: ''
    }
  }
})(verifySignIn);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
