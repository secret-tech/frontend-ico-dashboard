import React from 'react';
import s from './styles.css';

const Input = (props) => {
  const { invalid, ...restProps } = props;

  return (
    <input className={s.input} {...restProps} />
  );
};

export default Input;
