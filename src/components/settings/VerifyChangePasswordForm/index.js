import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderPassword';
import VerifyTip from '../../common/VerifyTip';

import s from './styles.scss';

const VerifyChangePasswordForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    method,
    fetching
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
          placeholder={t('verifyChangePasswordForm.code')}
          validate={twoFactorCode}/>
      </FormSection>

      <Button
        type="submit"
        large
        fill
        intent={Intent.PRIMARY}
        text={t('verifyChangePasswordForm.submit')}
        disabled={invalid}
        loading={fetching}/>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifyChangePassword',
  initialValues: {
    oldPassword: '',
    newPassword: '',
    verification: {
      verificationId: '',
      code: ''
    }
  }
})(VerifyChangePasswordForm);
const TranslatedComponent = translate('settings')(FormComponent);
export default TranslatedComponent;
