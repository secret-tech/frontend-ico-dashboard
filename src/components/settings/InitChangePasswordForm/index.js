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
        component={RenderPassword}
        placeholder="Old password"
        name="oldPassword"
        className="pt-input pt-large pt-fill"
        validate={passwordValidate}/>

      <Field
        component={RenderPassword}
        placeholder="New password"
        name="newPassword"
        className="pt-input pt-large pt-fill"
        tip
        validate={passwordValidate}/>

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
