import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import RenderInput from '../RenderInput';
import RenderPassword from '../../_forms/RenderPassword';

import { required, twoFactorCode } from '../../../utils/validators';
import s from './styles.scss';

const Playground = (props) => {
  const {
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <div className={s.playground}>
      <form onSubmit={handleSubmit}>
        <Field
          name="second"
          type="text"
          component={RenderInput}
          large
          leftIcon="search"
          placeholder="Search..."
          rightElement={<button className="pt-button pt-minimal pt-intent-warning pt-icon-lock"></button>}
          label="2FA input"
          validate={twoFactorCode}/>

        <Field
          name="second"
          type="text"
          component={RenderInput}
          large
          leftIcon="search"
          placeholder="Search..."
          rightElement={<button className="pt-button pt-minimal pt-intent-warning pt-icon-lock"></button>}
          label="2FA input"
          validate={twoFactorCode}
          tip="You may input only 6 digits"/>

        {/* <Field
          name="second"
          type="text"
          component={RenderInput}
          large/>

        <Field
          name="second"
          type="text"
          component={RenderInput}
          large
          leftIcon="search"
          placeholder="Search..."
          rightElement={<button className="pt-button pt-minimal pt-intent-warning pt-icon-lock"></button>}/>

        <Field
          name="second"
          type="text"
          component={RenderInput}
          large
          round
          leftIcon="search"
          placeholder="Search..."
          rightElement={<button className="pt-button pt-minimal pt-intent-warning pt-icon-lock"></button>}/> */}
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'initSignIn',
  initialValues: {
    email: '',
    password: ''
  }
})(Playground);
export default FormComponent;
