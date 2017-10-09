import React from 'react';

import FieldError from '../FieldError';
import Checkbox from '../../common/Checkbox';

const RenderCheckbox = (props) => {
  const { input, meta, ...restProps } = props;

  return (
    <FieldError meta={meta}>
      <Checkbox
        {...input}
        {...restProps}/>
    </FieldError>
  );
};

export default RenderCheckbox;
