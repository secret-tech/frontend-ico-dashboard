import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';

const EnableTwoFactorAuthForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="code"
        component={RenderInput}
        large
        placeholder={t('enable2faForm.code')}
        validate={twoFactorCode}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('enable2faForm.submit')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'enableTwoFactorAuth',
  enableReinitialize: true,
  initialValues: {
    code: '',
    verificationId: '',
    method: ''
  }
})(EnableTwoFactorAuthForm);
const TranslatedComponent = translate('settings')(FormComponent);
export default TranslatedComponent;
