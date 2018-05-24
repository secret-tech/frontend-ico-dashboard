import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { get } from '../../../utils/fetch';

import Spinner from '../../common/Spinner';

import s from './styles.scss';

class Shuftipro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: '',
      message: '',
      reference: '',
      signature: '',
      status_code: ''
    };
  }

  componentDidMount() {
    get('/kyc/init').then(({ message }) => {
      this.setState({ message });
    });
  }

  render() {
    const {
      t,
      kycStatus
    } = this.props;

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
        <div className={s.title}>{t('shuftipro.status.failure.title')}</div>
        <div className={s.text}>{t('shuftipro.status.failure.message')}</div>
      </div>
    );

    const renderSuccess = () => (
      <div className={s.status}>
        <div className={s.title}>{t('shuftipro.status.success.title')}</div>
        <div className={s.text}>{t('shuftipro.status.success.message')}</div>
      </div>
    );

    const renderPending = () => (
      <div className={s.status}>
        <div className={s.title}>{t('shuftipro.status.pending.title')}</div>
        <div className={s.text}>{t('shuftipro.status.pending.message')}</div>
      </div>
    );

    const renderPlugin = () => (
      <div>
          <h2>{t('shuftipro.title')}</h2>
          {this.state.message
            ? (
              <div>
                <p>{t('shuftipro.loaded')}</p>

                <iframe
                  style={{ width: '702px', height: '502px', border: 'none' }}
                  src={this.state.message}
                  id="api-frame"/>
              </div>
            )
            : (
              <div className={s.spinner}>
                <p>{t('shuftipro.loading')}</p>
                <Spinner color="#f52c5a"/>
              </div>
            )}
        </div>
    );

    return (
      <div>
        {renderPage()}
      </div>
    );
  }
}

const TranslatedComponent = translate('verification')(Shuftipro);
export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {}
)(TranslatedComponent);
