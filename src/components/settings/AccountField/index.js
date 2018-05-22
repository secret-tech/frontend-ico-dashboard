import React from 'react';

import AccountFieldPlaceholder from '../AccountFieldPlaceholder';

const AccountField = (props) => {
  const {
    value,
    label,
    fetching,
    placeholderWidth
  } = props;

  return fetching
    ? <AccountFieldPlaceholder width={placeholderWidth}/>
    : <div>{label}: <b>{value}</b></div>;
};

export default AccountField;
