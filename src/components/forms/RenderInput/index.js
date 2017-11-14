import React from 'react';

import FieldError from '../FieldError';
import Input from '../../common/Input';

const RenderInput = (props) => {
  const { input, meta, ...restProps } = props;

  return (
    <FieldError meta={meta}>
      <Input
        meta={meta}
        {...input}
        {...restProps}/>
    </FieldError>
  );
};

export default RenderInput;
