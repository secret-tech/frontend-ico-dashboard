import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RPPasswordForm = (props) => {
  console.log(props);

  return (
    <div>
      <div className={s.title}>Password Recovery</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="password"
            type="password"
            placeholder="Enter new password"/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderInput}
            name="passwordConfirm"
            type="password"
            placeholder="Password confirmation"/>
        </div>

        <div className={s.button}>
          <Button>Continue</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordEmailForm',
  initialValues: {
    password: '',
    passwordConfirm: ''
  }
})(RPPasswordForm);

export default FormComponent;
