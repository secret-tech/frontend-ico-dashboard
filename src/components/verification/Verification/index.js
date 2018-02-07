import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import loadScript from '../../../utils/scriptLoader';
import s from './styles.css';

import notify from '../../../utils/notifications';

import { get } from '../../../utils/fetch';

import Spinner from '../../common/Spinner';
import Globals from '../../../locales/globals';

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
              this.props.notify('error', 'Server error');
            }

            this.setState({ error: e.error });
          });
      });
  }

  render() {
    const { t, kycStatus } = this.props;

    const renderPage = () => {
      switch (kycStatus) {
        case 'verified':
          return renderSuccess();
        case 'failed':
          return renderFailed();
        case 'pending':
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
          <a href={`mailto:${Globals.supportMail}`}>{Globals.supportMail}</a>
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
          <Spinner color="#0080ff"/>
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

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    notify
  }
)(TranslatedComponent);
