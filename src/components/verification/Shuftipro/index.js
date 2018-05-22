import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { get } from '../../../utils/fetch';

import Spinner from '../../common/Spinner';

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
    const { kycStatus } = this.props;

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
        <div className={s.title}>Verification failure.</div>
        <div className={s.text}>
          We were unable to match your account information automatically and uploaded documents.
          Please reload the page and try again or contact Quantor support.<br/><br/>
          <a href="">support@secrettech.io</a>
        </div>
      </div>
    );

    const renderSuccess = () => (
      <div className={s.status}>
        <div className={s.title}>Account verification complete</div>
        <div className={s.text}>
          Your personal data has been verified successfully,
          and now you have full access to Quantor crowdsale.
        </div>
      </div>
    );

    const renderPending = () => (
      <div className={s.status}>
        <div className={s.title}>Your account is being verified…</div>
        <div className={s.text}>
          Your documents are successfully uploaded and being processed now.
          This may take up to 15 minutes, please be patient and don’t try to
          relaunch the verification process.
        </div>
      </div>
    );

    const renderPlugin = () => (
      <div>
          <h2>KYC/AML verification</h2>
          {this.state.message
            ? (
              <div>
                <p>Widget was loaded successfully. Please, follow the steps provided below</p>

                <iframe
                  style={{ width: '702px', height: '502px', border: 'none' }}
                  src={this.state.message}
                  id="api-frame"/>
              </div>
            )
            : (
              <div className={s.spinner}>
                <p>Please, wait until Shuftipro widget was loaded</p>
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

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {}
)(Shuftipro);
