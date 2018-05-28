import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { closeTxFeeHelp } from '../../../redux/modules/dashboard/txFeeHelp';

import Popup from '../../../containers/common/Popup';

const TxFeeHelp = (props) => {
  const { t, open, closeTxFeeHelp } = props;

  return (
    <Popup
      title={t('whatsTheGas')}
      icon="info-sign"
      isOpen={open}
      onClose={() => closeTxFeeHelp()}>
        <div>
          {t('gasFeeExplanation')} <a href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html" target="_blank">{t('here')}</a>.
        </div>
    </Popup>
  );
};

const TranslatedComponent = translate('dashboard')(TxFeeHelp);

export default connect(
  (state) => ({
    open: state.dashboard.txFeeHelp.open
  }),
  {
    closeTxFeeHelp
  }
)(TranslatedComponent);
