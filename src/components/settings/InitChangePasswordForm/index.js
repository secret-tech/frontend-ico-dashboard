import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { passwordValidate } from '../../../utils/validators';

import RenderPassword from '../../_forms/RenderPassword';

const ChangePasswordForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="oldPassword"
        component={RenderPassword}
        large
        fill
        placeholder={t('initChangePasswordForm.oldPassword')}
        validate={passwordValidate}/>

      <Field
        name="newPassword"
        component={RenderPassword}
        large
        fill
        placeholder={t('initChangePasswordForm.newPassword')}
        validate={passwordValidate}
        tip={t('initChangePasswordForm.passwordTip')}/>

      <div>
        <Button
          type="submit"
          large
          fill
          intent={Intent.PRIMARY}
          text={t('initChangePasswordForm.submit')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'initChangePassword',
  initialValues: {
    oldPassword: '',
    newPassword: ''
  }
})(ChangePasswordForm);
const TranslatedComponent = translate('settings')(FormComponent);
export default TranslatedComponent;
