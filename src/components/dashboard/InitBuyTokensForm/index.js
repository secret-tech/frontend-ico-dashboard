import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import RenderInput from '../../_forms/RenderPassword';

import { required } from '../../../utils/validators';

const InitBuyTokensForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="mnemonic"
        component={RenderInput}
        large
        fill
        placeholder={t('initBuyTokensForm.mnemonic')}
        validate={required}
        tip={t('initBuyTokensForm.tip')}/>

      <Button
        type="submit"
        large
        fill
        intent={Intent.PRIMARY}
        loading={fetching}
        disabled={invalid}
        text={t('initBuyTokensForm.submit')}/>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifyBuyTokens',
  enableReinitialize: true
})(InitBuyTokensForm);
const TranslatedComponent = translate('dashboard')(FormComponent);
export default TranslatedComponent;
