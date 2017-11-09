import React, { Component } from 'react';

import loadScript from '../../../utils/scriptLoader';

class Verification extends Component {
  componentWillMount() {
    loadScript('https://netverify.com/widget/jumio-verify/2.0/iframe-script.js')
      .then(() => {
        window.JumioClient.setVars({
          authorizationToken: '68b0d36a-46f4-4336-8f4e-e1f570cea5d9'
        }).initVerify('jumio');
      });
  }

  render() {
    return (
      <div>
        <div id="jumio"/>
      </div>
    );
  }
}

export default Verification;
