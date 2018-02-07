import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import s from './styles.css';

import { namedRoutes } from '../../../routes';
import { emailValidate } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RestorePasswordEmailForm = (props) => {
  const {
    t,
    spinner,
    invalid,
    error,
    handleSubmit
  } = props;

  return (
    <div>
      <div className={s.title}>{t('passwordRecovery')}</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="text"
            placeholder={t('email')}
            validate={emailValidate}/>
        </div>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={invalid}>{t('submit')}</Button>
        </div>

        <div className={s.footer}>
          {t('backTo')} <Link to={namedRoutes.signIn}>{t('signIn')}</Link>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordEmailForm',
  initialValues: {
    email: ''
  }
})(RestorePasswordEmailForm);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
