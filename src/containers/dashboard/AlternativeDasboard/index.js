import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Button from '../../../components/common/Button';
import Globals from '../../../locales/globals';

class AlternativeDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      more: false
    };
  }

  render() {
    const { t, openMakeDepositPopup } = this.props;
    const { more } = this.state;

    const renderSubtitle = () =>
      (more
        ? (
          <div className={s.subtitle}>
          {t('alternativeDashboardSubtitle_1')}<br/>
          {t('alternativeDashboardSubtitle_2')}<br/><br/>
          {t('alternativeDashboardSubtitle_3')}<br/><br/>
          {t('alternativeDashboardSubtitle_4')}
          </div>
        )
        : (
          <div className={s.subtitle}>
            {t('alternativeDashboardSubtitle_5')}<br/>
            {t('alternativeDashboardSubtitle_6')} <a onClick={() => this.setState({ more: true })}>{t('more')}</a>
          </div>
        ));

    return (
      <div className={s.dash}>
        <div className={s.title}>
          {t('alternativeDashboardTitle')}
        </div>

        {renderSubtitle()}

        <div className={s.button}>
          <Button size="small" onClick={() => openMakeDepositPopup()}>{t('makeDeposit')}</Button>
        </div>

        <div className={s.section}>
          <div className={s.sectionHead}>
            <div className={s.sectionTitle}>{t('tokenPriceProjectionTitle')}</div>
            <div className={s.sectionSubtitle}>
              {t('tokenPriceProjectionSubtitle')}
            </div>
          </div>

          <div className={s.blocks}>
            <div className={s.block}>
              <div className={s.now}>{t('now')}</div>
              <div className={s.wrap}>
                <div className={s.val}>$1</div>
                <div className={s.lbl}>{t('icoPrice')}</div>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.up}/>
              <div className={s.wrap}>
                <div className={s.val}>$5</div>
                <div className={s.lbl}>{t('in2years')}</div>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.up}/>
              <div className={s.wrap}>
                <div className={s.val}>$13</div>
                <div className={s.lbl}>{t('in4years')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.section}>
          <div className={s.sectionHead}>
            <div className={s.sectionTitle}>{t('corporateClients')}</div>
          </div>

          <div className={s.blocks}>
            <div className={s.block}>
              <div className={s.now}>{t('now')}</div>
              <div className={s.wrap}>
                <div className={s.val}>300+</div>
                <div className={s.lbl}>{t('betaAccessRequests')}</div>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.up}/>
              <div className={s.wrap}>
                <div className={s.val}>1K</div>
                <div className={s.lbl}>{t('companiesAfterICO')}</div>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.up}/>
              <div className={s.wrap}>
                <div className={s.val}>20K</div>
                <div className={s.lbl}>{t('companiesIn2Years')}</div>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.up}/>
              <div className={s.wrap}>
                <div className={s.val}>50K</div>
                <div className={s.lbl}>{t('companiesIn4Years')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.wpLink}>
          <a href={Globals.whitepaperLink} target="_blank">{t('readWhitepaper')}</a>
        </div>
      </div>
    );
  }
}

const TranslatedComponent = translate('dashboard')(AlternativeDashboard);

export default connect(
  null,
  {
    openMakeDepositPopup
  }
)(TranslatedComponent);
