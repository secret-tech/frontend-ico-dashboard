import React from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button } from '@blueprintjs/core';

import { closeVerifyPopup, verifyBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../containers/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';

import { twoFactorCode } from '../../../utils/validators';

const VerifyBuyTokensPopup = (props) => {
  const {
    t,
    open,
    handleSubmit,
    closeVerifyPopup,
    fetching,
    invalid
  } = props;

  return (
    <Popup
      title={t('verifyBuyTokensPopup.title')}
      isOpen={open}
      inClose={closeVerifyPopup}
      style={{ width: '400px' }}>
        <div>{/* renderTip() */}</div>

        <form onSubmit={handleSubmit(verifyBuyTokens)}>
          <FormSection name="verification">
            <Field
              component={RenderInput}
              name="code"
              placeholder={t('verifyBuyTokensPopup.code')}
              validate={twoFactorCode}/>
          </FormSection>

          <Button
            type="submit"
            loading={fetching}
            disabled={invalid}>
            {t('verifyBuyTokensPopup.submit')}
          </Button>
        </form>
    </Popup>
  );
};


const FormComponent = reduxForm({
  form: 'buyTokensVerify',
  enableReinitialize: true
})(VerifyBuyTokensPopup);

const TranslatedComponent = translate('dashboard')(FormComponent);

export default connect(
  (state) => ({
    open: state.dashboard.buyTokens.verifyPopupIsOpen,
    fetching: state.dashboard.buyTokens.fetching,
    initialValues: {
      ethAmount: 1,
      mnemonic: 'changeme',
      verification: {
        verificationId: state.dashboard.buyTokens.verification.verificationId,
        method: state.dashboard.buyTokens.verification.method
      }
    }
  }),
  {
    closeVerifyPopup
  }
)(TranslatedComponent);
