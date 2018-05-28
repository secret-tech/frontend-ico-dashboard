import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { format } from 'date-fns';

import { required, phoneValidate } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import RenderSelect from '../../_forms/RenderSelect';
import RenderDatePicker from '../../_forms/RenderDatePicker';

import s from './styles.scss';

const InfoSignUpForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.tip}>{t('signUp.form.infoSignUp.tip')}</div>

      <Field
        name="firstName"
        type="text"
        component={RenderInput}
        large
        placeholder={t('signUp.form.infoSignUp.firstName')}
        validate={required}/>

      <Field
        name="lastName"
        type="text"
        component={RenderInput}
        large
        placeholder={t('signUp.form.infoSignUp.lastName')}
        validate={required}/>

      <Field
        name="phone"
        type="text"
        component={RenderInput}
        large
        placeholder={t('signUp.form.infoSignUp.phone')}
        validate={phoneValidate}
        tip="Ex: +79999999999"/>

      <Field
        component={RenderSelect}
        name="country"
        className="pt-select pt-large pt-fill"
        validate={required}>
        <option value="">{t('signUp.form.infoSignUp.country')}</option>
        {iso3311a2.getCodes().map((code) =>
          <option key={code} value={code}>{iso3311a2.getCountry(code)}</option>)}
      </Field>

      <Field
        name="dob"
        component={RenderDatePicker}
        placeholder={t('signUp.form.infoSignUp.dob')}
        inputProps={{ large: true }}
        popoverProps={{ className: 'pt-fill' }}
        validate={required}
        minDate={new Date('1900-01-01')}
        maxDate={new Date('2001-01-01')}
        formatDate={(str) => format(str, 'DD MMMM YYYY')}
        parseDate={(str) => new Date(str)}
        normalize={(str) => format(str, 'YYYY-MM-DD')}
        format={(str) => new Date(str)}/>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('signUp.form.infoSignUp.submit')}
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
    dob: null
  }
})(InfoSignUpForm);
const TranslatedComponent = translate('auth')(FormComponent);
export default TranslatedComponent;
