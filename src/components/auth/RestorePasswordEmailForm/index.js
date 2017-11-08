import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import s from './styles.css';

import { namedRoutes } from '../../../routes';
import { emailValidate } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RestorePasswordEmailForm = (props) => {
  const {
    spinner,
    invalid,
    error,
    handleSubmit
  } = props;

  return (
    <div>
      <div className={s.title}>Password Recovery</div>

      {error && <div className={s.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="text"
            placeholder="E-mail"
            validate={emailValidate}/>
        </div>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
        </div>

        <div className={s.footer}>
          Back to <Link to={namedRoutes.signIn}>Sign In</Link>
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
})(RestorePasswordEmailForm);

export default FormComponent;
