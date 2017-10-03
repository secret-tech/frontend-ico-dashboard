import React from 'react';
import s from './styles.css';

const Button = (props) => {
  const { children } = props;

  return (
    <button type="button" className={s.button} {...props}>{children}</button>
  );
};

export default Button;
