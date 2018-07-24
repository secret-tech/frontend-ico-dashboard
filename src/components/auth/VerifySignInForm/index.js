import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import VerifyTip from '../../common/VerifyTip';

import s from './styles.scss';

const VerifySignInForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching,
    method
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.tip}>
        <VerifyTip method={method}/>
      </div>

      <FormSection name="verification">
        <Field
          name="code"
          type="text"
          component={RenderInput}
          large
          placeholder={t('signIn.form.verifySignIn.code')}
          validate={twoFactorCode}/>
      </FormSection>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('signIn.form.verifySignIn.submit')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

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
})(VerifySignInForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
