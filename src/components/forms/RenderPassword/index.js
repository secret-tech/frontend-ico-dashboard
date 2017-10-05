import React from 'react';

import FieldError from '../FieldError';
import Password from '../../common/Password';

const RenderPassword = (props) => {
  const { input, meta, ...restProps } = props;

  return (
    <FieldError meta={meta}>
      <Password
        {...input}
        {...restProps}/>
    </FieldError>
  );
};

export default RenderPassword;
