import React from 'react';

const VerifyTip = (props) => {
  const {
    method
  } = props;

  const email = (
    <div>To activate account - enter PIN code from email</div>
  );

  const app = (
    <div>To activate account - enter PIN code from Google Authenticator</div>
  );

  return method === 'google_auth' ? app : email;
};

export default VerifyTip;
