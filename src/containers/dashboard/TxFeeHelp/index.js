import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { closeTxFeeHelp } from '../../../redux/modules/dashboard/txFeeHelp';

import Popup from '../../../components/common/Popup';

const TxFeeHelp = (props) => {
  const { t, open, closeTxFeeHelp } = props;

  return (
    <Popup
      open={open}
      close={() => closeTxFeeHelp()}>
      <div>
        <div className={s.alert}/>
        <div className={s.title}>{t('whatsTheGas')}</div>
        <div className={s.text}>
          {t('gasFeeExplanation')} <a href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html" target="_blank">{t('here')}</a>.
        </div>
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
