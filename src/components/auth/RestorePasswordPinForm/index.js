import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RestorePasswordPinForm = (props) => {
  const {
    spinner,
    method,
    invalid,
    error,
    handleSubmit
  } = props;

  const renderTip = () => (
    method === 'email'
      ? 'We sent the code to your email address. Please, check your inbox or spam folder.'
      : 'Use Google Authenticator to get confirmation code.'
  );

  return (
    <div>
      <div className={s.title}>Password Recovery</div>
      <div className={s.description}>{renderTip()}</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="pin"
            type="text"
            placeholder="Enter verification code"
            validate={twoFactorCode}/>
        </div>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordPinForm',
  initialValues: {
    pin: ''
  }
})(RestorePasswordPinForm);

export default FormComponent;
