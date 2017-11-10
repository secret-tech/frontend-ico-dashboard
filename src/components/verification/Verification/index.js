import React, { Component } from 'react';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';

import { initVerification } from '../../../redux/modules/verification/verification';

class Verification extends Component {
  componentWillMount() {
    this.props.initVerification();
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed, authorizationToken } = nextProps;

    if (authorizationToken !== this.props.authorizationToken) {
      if (isScriptLoaded) {
        if (isScriptLoadSucceed) {
          window.JumioClient.setVars({
            authorizationToken
          }).initVerify('jumio');
        }
      }
    }
  }

  render() {
    return (
      <div>
        <div id="jumio"/>
      </div>
    );
  }
}

const componentWithScript = scriptLoader([
  'https://lon.netverify.com/widget/jumio-verify/2.0/iframe-script.js'
])(Verification);

export default connect(
  (state) => ({
    authorizationToken: state.verification.verification.authorizationToken
  }),
  {
    initVerification
  }
)(componentWithScript);
