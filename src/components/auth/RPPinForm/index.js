import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RPPinForm = (props) => {
  console.log(props);

  return (
    <div>
      <div className={s.title}>Password Recovery</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="pin"
            type="text"
            placeholder="Enter PIN from email"/>
        </div>

        <div className={s.button}>
          <Button>Continue</Button>
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
})(RPPinForm);

export default FormComponent;
