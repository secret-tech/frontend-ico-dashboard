import React from 'react';
import s from './styles.css';

import Spinner from '../Spinner';

const Button = (props) => {
  const { children, spinner, ...restProps } = props;

  return (
    <button
      type="button"
      className={s.button}
      {...restProps}
    >
      {spinner ? <Spinner /> : children}
    </button>
  );
};

export default Button;
