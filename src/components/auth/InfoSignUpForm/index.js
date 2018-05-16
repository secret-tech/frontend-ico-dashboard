import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';
import iso3311a2 from 'iso-3166-1-alpha-2';

import { required } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderSelect from '../../_forms/RenderSelect';

import s from './styles.scss';

const InfoSignUpForm = (props) => {
  const {
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.tip}>
        This information will be used for KYC/AML verification. Be sure that all data is correct
      </div>

      <Field
        component={RenderInput}
        placeholder="First name"
        name="firstName"
        type="text"
        className="pt-input pt-large pt-fill"
        validate={required}/>

      <Field
        component={RenderInput}
        placeholder="Last name"
        name="lastName"
        type="text"
        className="pt-input pt-large pt-fill"
        validate={required}/>

      <Field
        component={RenderInput}
        placeholder="Phone number"
        name="phone"
        type="text"
        className="pt-input pt-large pt-fill"
        validate={required}/>

      <Field
        component={RenderSelect}
        name="country"
        className="pt-select pt-large pt-fill"
        validate={required}>
        <option value="">Select country</option>
        {iso3311a2.getCodes().map((code) =>
          <option key={code} value={code}>{iso3311a2.getCountry(code)}</option>)}
      </Field>

      <Field
        component={RenderInput}
        placeholder="Date of birth"
        name="dob"
        type="text"
        className="pt-input pt-large pt-fill"
        tip="Example: 2005-08-21"
        validate={required}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text="Sign up"
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'infoSignUp',
  initialValues: {
    email: '',
    password: '',
    referral: '',
    agreeTos: true,
    fistName: '',
    lastName: '',
    phone: '',
    country: '',
    dob: ''
  }
})(InfoSignUpForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
