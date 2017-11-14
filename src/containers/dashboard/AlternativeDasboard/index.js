import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Button from '../../../components/common/Button';

class AlternativeDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      more: false
    };
  }

  render() {
    const { openMakeDepositPopup } = this.props;
    const { more } = this.state;

    const renderSubtitle = () =>
      (more
        ? (
          <div className={s.subtitle}>
          The purchase of the tokens will be available after the beginning of ICO.<br/>
          You’ll receive an email notification at the date of the crowdsale. All
          participants of the crowdsale are obliged to go through KYC/AML verification.<br/><br/>
          The details on how to go through this procedure and step-by-step guidelines on how
          to participate in the crowdsale will be provided closer to the date of ICO.<br/><br/>
          To secure your share, of JCR tokens make a deposit to your Jincor wallet now.
          </div>
        )
        : (
          <div className={s.subtitle}>
            The purchase of the tokens will be available after the beginning of ICO.<br/>
            You’ll receive an email notification at the date of
            the… <a onClick={() => this.setState({ more: true })}>more</a>
          </div>
        ));

    return (
      <div className={s.dash}>
        <div className={s.title}>
          Jincor ICO starts on December 1
        </div>

        {renderSubtitle()}

        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>Make deposit</Button>
        </div>

        <div className={s.section}>
          <div className={s.sectionHead}>
            <div className={s.sectionTitle}>JCR Token Price Projection</div>
            <div className={s.sectionSubtitle}>
              This moderate revenue projection for JCR token value is based on businesses demand
              for cryptocurrency payment solutions trends and speed of spreading the smart
              contracts. For more details, please read the Whitepaper.
            </div>
          </div>

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
          <div className={s.sectionHead}>
            <div className={s.sectionTitle}>Corporate clients</div>
          </div>

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
                <div className={s.lbl}>Companies in 2 years</div>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.up}/>
              <div className={s.wrap}>
                <div className={s.val}>50K</div>
                <div className={s.lbl}>Companies in 4 years</div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.wpLink}>
          <a href="https://jincor.com/whitepaper" target="_blank">Read the Whitepaper</a>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    openMakeDepositPopup
  }
)(AlternativeDashboard);
