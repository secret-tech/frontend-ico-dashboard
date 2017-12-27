import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeTxFeeHelp } from '../../../redux/modules/dashboard/txFeeHelp';

import Popup from '../../../components/common/Popup';

const TxFeeHelp = (props) => {
  const { open, closeTxFeeHelp } = props;

  return (
    <Popup
      open={open}
      close={() => closeTxFeeHelp()}>
      <div>
        <div className={s.alert}/>
        <div className={s.title}>What is gas fee?</div>
        <div className={s.text}>
          Gas fee needed to make a tokens purchasing transaction in Ethereum network, more information you can find <a href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html" target="_blank">here</a>.
        </div>
      </div>
    </Popup>
  );
};

export default connect(
  (state) => ({
    open: state.dashboard.txFeeHelp.open
  }),
  {
    closeTxFeeHelp
  }
)(TxFeeHelp);
