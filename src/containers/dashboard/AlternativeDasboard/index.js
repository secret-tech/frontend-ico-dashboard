import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Button from '../../../components/common/Button';

const AlternativeDashboard = (props) => {
  const { openMakeDepositPopup } = props;

  return (
    <div className={s.dash}>
      <div className={s.title}>
        Jincor ICO starts on November 15
      </div>

      <div className={s.subtitle}>
        You can buy tokens when ICO starts. We will notify you on your email.<br/>
        Now you can make deposit to your wallet.
      </div>

      <div className={s.button}>
        <Button size="small" onClick={() => openMakeDepositPopup()}>Make deposit</Button>
      </div>
    </div>
  );
};

export default connect(
  null,
  {
    openMakeDepositPopup
  }
)(AlternativeDashboard);
