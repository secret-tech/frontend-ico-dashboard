import React, { Component } from 'react';
import loadScript from 'simple-load-script';
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
    function receiveMessage(event) {
      const data = window.JSON.parse(event.data);
      console.log('Netverify Web embedded was loaded.');
      console.log('authorization token:', data.authorizationToken);
      console.log('scan reference:', data.scanReference);
      console.log('timestamp:', data.timestamp);
    }
    window.addEventListener('message', receiveMessage, false);

    get('/kyc/init') // get token from out backend
      .then((result) => {
        this.setState({ ...result }, () => {
          loadScript('https://netverify.com/widget/jumio-verify/2.0/iframe-script.js') // then load jumio script
            .then(() => {
              window.JumioClient.setVars({
                authorizationToken: result.authorizationToken // init jumio with token
              }).initVerify('JUMIOIFRAME'); // place jumio into ref-container
              console.log(window);
            });
        });
      })
      .catch((error) => {
        this.setState({ ...error });
      });
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        {error ? <div className={s.error}>{error}</div> : null}
        <div id="JUMIOIFRAME" ref={((jumio) => { this.jumio = jumio; })}/> // set ref-container for jumio
      </div>
    );
  }
}

export default Verification;
