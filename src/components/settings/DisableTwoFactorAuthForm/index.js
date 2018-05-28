import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';

const DisableTwoFactorAuthForm = (props) => {
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
        placeholder={t('disable2faForm.code')}
        validate={twoFactorCode}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('disable2faForm.submit')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'disableTwoFactorAuth',
  enableReinitialize: true,
  initialValues: {
    code: '',
    verificationId: '',
    method: ''
  }
})(DisableTwoFactorAuthForm);
const TranslatedComponent = translate('settings')(FormComponent);
export default TranslatedComponent;
