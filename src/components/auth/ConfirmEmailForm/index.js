import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import { required } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const ConfirmEmailForm = (props) => {
  const { spinner, handleSubmit, invalid, error, verificationId } = props;
  props.change('verificationId', verificationId);

  return (
    <div>
      <div className={s.title}>Sign Up</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="pin"
            type="text"
            placeholder="Enter PIN"
            validate={required}/>
        </div>

        <Field
          component={RenderInput}
          name="verificationId"
          type="hidden"
          disabled/>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'signUp',
  initialValues: {
    pin: '',
    verificationId: ''
  }
})(ConfirmEmailForm);

export default FormComponent;
