import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { closeMnemonicPopup, initiateBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../containers/common/Popup';
import InitBuyTokensForm from '../../../components/dashboard/InitBuyTokensForm';

const MnemonicPopup = (props) => {
  const {
    t,
    mnemonicPopupIsOpen,
    closeMnemonicPopup,
    fetching,
    eth
  } = props;

  return (
    <Popup
      title={t('mnemonicPopup.title')}
      isOpen={mnemonicPopupIsOpen}
      onClose={closeMnemonicPopup}
      style={{ width: '400px' }}>
      <InitBuyTokensForm
        onSubmit={initiateBuyTokens}
        fetching={fetching}
        initialValues={{
          ethAmount: eth
        }}/>
    </Popup>
  );
};


const TranslatedComponent = translate('dashboard')(MnemonicPopup);
export default connect(
  (state) => ({
    ...state.dashboard.buyTokens,
  }),
  {
    closeMnemonicPopup
  }
)(TranslatedComponent);
