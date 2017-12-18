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
          Text about gas fee. To buy tokens you need to verify your account.
          It takes a few minutes. To buy tokens you need to verify.
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
