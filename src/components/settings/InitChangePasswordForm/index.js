import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { passwordValidate } from '../../../utils/validators';

import RenderPassword from '../../_forms/RenderPassword';

const ChangePasswordForm = (props) => {
  const {
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
        placeholder="Old password"
        validate={passwordValidate}/>

      <Field
        name="newPassword"
        component={RenderPassword}
        large
        placeholder="New password"
        validate={passwordValidate}
        tip="Password must be at least 8 characters length, contain at least one number, one capital letter, one small letter. Special characters are allowed."/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text="Change password"
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
