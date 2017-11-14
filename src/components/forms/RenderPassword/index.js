import React from 'react';

import FieldError from '../FieldError';
import Password from '../../common/Password';

const RenderPassword = (props) => {
  const { input, meta, ...restProps } = props;
  const { dirty, valid, invalid } = meta;

  return (
    <FieldError meta={meta}>
      <Password
        valid={dirty && valid}
        invalid={invalid}
        {...input}
        {...restProps}/>
    </FieldError>
  );
};

export default RenderPassword;
