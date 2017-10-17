import React from 'react';
import classNames from 'classnames/bind';
import s from './styles.css';

const cx = classNames.bind(s);

const Input = (props) => {
  const {
    invalid,
    size,
    ...restProps
  } = props;

  const getSize = (val) => {
    switch (val) {
      case 'large':
        return s.large;
      default:
        return null;
    }
  };

  const className = cx(
    s.input,
    getSize(size)
  );

  return (
    <input
      className={className}
      {...restProps}/>
  );
};

export default Input;
