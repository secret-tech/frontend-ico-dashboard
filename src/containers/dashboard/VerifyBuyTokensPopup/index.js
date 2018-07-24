import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { closeVerifyPopup, verifyBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../containers/common/Popup';
import VerifyBuyTokensForm from '../../../components/dashboard/VerifyBuyTokensForm';

const VerifyBuyTokensPopup = (props) => {
  const {
    t,
    verifyPopupIsOpen,
    closeVerifyPopup,
    fetching,
    eth,
    mnemonic,
    verification: {
      method,
      verificationId
    }
  } = props;

  return (
    <Popup
      title={t('verifyBuyTokensPopup.title')}
      isOpen={verifyPopupIsOpen}
      onClose={closeVerifyPopup}
      style={{ width: '400px' }}>
        <VerifyBuyTokensForm
          onSubmit={verifyBuyTokens}
          fetching={fetching}
          method={method}
          initialValues={{
            ethAmount: eth,
            mnemonic,
            verification: {
              method,
              verificationId
            }
          }}/>
    </Popup>
  );
};


const TranslatedComponent = translate('dashboard')(VerifyBuyTokensPopup);

export default connect(
  (state) => ({
    ...state.dashboard.buyTokens
  }),
  {
    closeVerifyPopup
  }
)(TranslatedComponent);
