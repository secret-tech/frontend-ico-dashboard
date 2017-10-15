import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Button from '../../../components/common/Button';

const BalanceInfo = (props) => {
  const { openMakeDepositPopup } = props;

  return (
    <div className={s.balance}>
      <div className={s.button}>
        <Button size="small" onClick={() => openMakeDepositPopup()}>Make deposit</Button>
      </div>

      <div className={s.block}>
        <div className={s.val}>5</div>
        <div className={s.label}>ETH balance</div>
      </div>
      <div className={s.block}>
        <div className={s.val}>3060</div>
        <div className={s.label}>JCR token balance</div>
      </div>
      <div className={s.block}>
        <div className={s.val}>0.0035 ETH</div>
        <div className={s.label}>
          Per JCR token in&nbsp;
          <button className={s.activeCurrencyButton}>ETH</button>&nbsp;•&nbsp;
          <button className={s.currencybutton}>USD</button>
        </div>
      </div>
      <div className={s.block}>
        <div className={s.val}>1 000 485 JCR</div>
        <div className={s.label}>Tokens sold</div>
      </div>
      <div className={s.block}>
        <div className={s.val}>3501 ETH</div>
        <div className={s.label}>
          Raised in&nbsp;
          <button className={s.activeCurrencyButton}>ETH</button>&nbsp;•&nbsp;
          <button className={s.currencybutton}>USD</button>
        </div>
      </div>
      <div className={s.block}>
        <div className={s.val}>45</div>
        <div className={s.label}>Days to go</div>
      </div>
    </div>
  );
};

export default connect(
  null,
  {
    openMakeDepositPopup
  }
)(BalanceInfo);
