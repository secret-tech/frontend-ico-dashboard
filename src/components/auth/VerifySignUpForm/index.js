import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { required } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import VerifyTip from '../../common/VerifyTip';

import s from './styles.scss';

const VerifySignUpForm = (props) => {
  const {
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

      <Field
        component={RenderInput}
        placeholder="Verification code"
        name="code"
        type="text"
        className="pt-input pt-large pt-fill"
        validate={required}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text="Verify sign up"
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifySignUp',
  initialValues: {
    email: '',
    verificationId: '',
    code: ''
  }
})(VerifySignUpForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
