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

      <div className={s.section}>
        <div className={s.sectionTitle}>JCR Token Price</div>

        <div className={s.blocks}>
          <div className={s.block}>
            <div className={s.now}>Now</div>
            <div className={s.wrap}>
              <div className={s.val}>$1</div>
              <div className={s.lbl}>ICO price</div>
            </div>
          </div>

          <div className={s.block}>
            <div className={s.up}/>
            <div className={s.wrap}>
              <div className={s.val}>$5</div>
              <div className={s.lbl}>In 2 years</div>
            </div>
          </div>

          <div className={s.block}>
            <div className={s.up}/>
            <div className={s.wrap}>
              <div className={s.val}>$13</div>
              <div className={s.lbl}>In 4 years</div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}>Corporate clients</div>

        <div className={s.blocks}>
          <div className={s.block}>
            <div className={s.now}>Now</div>
            <div className={s.wrap}>
              <div className={s.val}>300+</div>
              <div className={s.lbl}>Beta access requests</div>
            </div>
          </div>

          <div className={s.block}>
            <div className={s.up}/>
            <div className={s.wrap}>
              <div className={s.val}>1K</div>
              <div className={s.lbl}>Companies after ICO</div>
            </div>
          </div>

          <div className={s.block}>
            <div className={s.up}/>
            <div className={s.wrap}>
              <div className={s.val}>20K</div>
              <div className={s.lbl}>Companies is 2 years</div>
            </div>
          </div>

          <div className={s.block}>
            <div className={s.up}/>
            <div className={s.wrap}>
              <div className={s.val}>50K</div>
              <div className={s.lbl}>Companies is 4 years</div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.wpLink}>
        <a href="https://jincor.com/whitepaper" target="_blank">More info in the Whitepaper</a>
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
