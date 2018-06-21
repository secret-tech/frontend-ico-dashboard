import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';
import VerifyTip from '../../common/VerifyTip';

import s from './styles.scss';

const VerifyBuyTokensForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    method,
    fetching
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.tip}>
        <VerifyTip method={method}/>
      </div>

      <FormSection name="verification">
        <Field
          component={RenderInput}
          name="code"
          large
          placeholder={t('verifyBuyTokensForm.code')}
          validate={twoFactorCode}/>
      </FormSection>

      <Button
        type="submit"
        large
        fill
        intent={Intent.PRIMARY}
        loading={fetching}
        disabled={invalid}
        text={t('verifyBuyTokensForm.submit')}/>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifyBuyTokens',
  enableReinitialize: true
})(VerifyBuyTokensForm);
const TranslatedComponent = translate('dashboard')(FormComponent);
export default TranslatedComponent;
