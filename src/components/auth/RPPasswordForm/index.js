import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import RenderPassword from '../../forms/RenderPassword';
import Button from '../../common/Button';

const RPPasswordForm = (props) => {
  console.log(props);

  return (
    <div>
      <div className={s.title}>Password Recovery</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderPassword}
            name="password"
            type="password"
            placeholder="Enter new password"/>
        </div>

        <div className={s.button}>
          <Button>Continue</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordPassForm',
  initialValues: {
    password: ''
  }
})(RPPasswordForm);

export default FormComponent;
