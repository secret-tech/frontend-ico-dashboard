import React, { Component } from 'react';
import loadScript from '../../../utils/scriptLoader';
import s from './styles.css';

import { get } from '../../../utils/fetch';

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
          .catch(({ error }) => {
            this.setState({ error });
          });
      });
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        {error ? <div className={s.error}>
          {error}<br/>
          <a href="mailto:support@jincor.com">support@jincor.com</a>
        </div> : null}
        <div id="jumio"/>
      </div>
    );
  }
}

export default Verification;
