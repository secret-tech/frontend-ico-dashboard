import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Spinner } from '@blueprintjs/core';

import { get } from '../../../utils/fetch';

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
      <div>
        <h2>{t('shuftipro.status.failure.title')}</h2>
        <div>{t('shuftipro.status.failure.message')}</div>
      </div>
    );

    const renderSuccess = () => (
      <div>
        <h2>{t('shuftipro.status.success.title')}</h2>
        <div>{t('shuftipro.status.success.message')}</div>
      </div>
    );

    const renderPending = () => (
      <div>
        <h2>{t('shuftipro.status.pending.title')}</h2>
        <div>{t('shuftipro.status.pending.message')}</div>
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
                <Spinner className="pt-small" intent="primary"/>
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
