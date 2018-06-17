import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';

import { closeMnemonicPopup, initiateBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../containers/common/Popup';
import RenderInput from '../../../components/_forms/RenderInput';

import { required } from '../../../utils/validators';

const MnemonicPopup = (props) => {
  const {
    t,
    open,
    handleSubmit,
    closeMnemonicPopup,
    fetching,
    invalid
  } = props;

  return (
    <Popup
      title={t('mnemonicPopup.title')}
      isOpen={open}
      onClose={closeMnemonicPopup}
      style={{ width: '400px' }}>
      <form onSubmit={handleSubmit(initiateBuyTokens)}>
        <Field
          name="mnemonic"
          component={RenderInput}
          large
          fill
          placeholder={t('mnemonicPopup.mnemonic')}
          validate={required}
          tip={t('mnemonicPopup.tip')}/>
        <Button
          type="submit"
          large
          fill
          intent={Intent.PRIMARY}
          loading={fetching}
          disabled={invalid}>
          {t('mnemonicPopup.submit')}
        </Button>
      </form>
    </Popup>
  );
};


const FormComponent = reduxForm({
  form: 'buyTokensMnemonic',
  enableReinitialize: true
})(MnemonicPopup);

const TranslatedComponent = translate('dashboard')(FormComponent);

export default connect(
  (state) => ({
    open: state.dashboard.buyTokens.mnemonicPopupIsOpen,
    fetching: state.dashboard.buyTokens.fetching,
    initialValues: {
      ethAmount: state.dashboard.buyTokens.eth
    }
  }),
  {
    closeMnemonicPopup
  }
)(TranslatedComponent);
