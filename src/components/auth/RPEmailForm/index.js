import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RPEmailForm = (props) => {
  const { spinner } = props;

  return (
    <div>
      <div className={s.title}>Password Recovery</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="text"
            placeholder="e-mail"/>
        </div>

        <div className={s.button}>
          <Button spinner={spinner}>Send</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordEmailForm',
  initialValues: {
    email: ''
  }
})(RPEmailForm);

export default FormComponent;
