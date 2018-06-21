import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Spinner } from '@blueprintjs/core';

import loadScript from '../../../utils/scriptLoader';
import s from './styles.scss';
import Toast from '../../../utils/toaster';
import { get } from '../../../utils/fetch';
import { KycStatus } from '../../../utils/verification';
import config from '../../../utils/config';

class Verification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: 0,
      authorizationToken: '',
      clientRedirectUrl: '',
      jumioIdScanReference: '',
      error: ''
    };
  }

  componentWillMount() {
    loadScript('https://lon.netverify.com/widget/jumio-verify/2.0/iframe-script.js')
      .then(() => {
        get('/kyc/init')
          .then(({ authorizationToken }) => {
            window.JumioClient.setVars({
              authorizationToken
            }).initVerify('jumio');
          })
          .catch((e) => {
            if (e.statusCode >= 500) {
              Toast.red({ message: 'Server error' });
            }

            this.setState({ error: e.error });
          });
      });
  }

  render() {
    const { t, kycStatus } = this.props;

    const renderPage = () => {
      switch (kycStatus) {
        case KycStatus.Verified:
          return renderSuccess();
        case KycStatus.Failed:
          return renderFailed();
        case KycStatus.Pending:
          return renderPending();
        default:
          return renderPlugin();
      }
    };

    const renderFailed = () => (
      <div className={s.status}>
        <div className={s.title}>{t('verificationFailure')}</div>
        <div className={s.text}>
          {t('verificationFailureText')}<br/><br/>
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
        </div>
      </div>
    );

    const renderSuccess = () => (
      <div className={s.status}>
        <div className={s.title}>{t('verificationComplete')}</div>
        <div className={s.text}>
          {t('verificationCompleteText')}
        </div>
      </div>
    );

    const renderPending = () => (
      <div className={s.status}>
        <div className={s.title}>{t('verificationInProgress')}</div>
        <div className={s.text}>
          {t('verificationInProgressText')}
        </div>
      </div>
    );

    const renderPlugin = () => (
      <div id="jumio">
        <div className={s.spinner}>
          <Spinner className="pt-small" intent="primary"/>
        </div>
      </div>
    );

    return (
      <div>
        {renderPage()}
      </div>
    );
  }
}

const TranslatedComponent = translate('verification')(Verification);

export default connect((state) => ({
  kycStatus: state.app.app.user.kycStatus
}))(TranslatedComponent);
