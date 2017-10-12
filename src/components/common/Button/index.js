import React from 'react';
import classNames from 'classnames/bind';
import s from './styles.css';

import Spinner from '../Spinner';

const cx = classNames.bind(s);

const Button = (props) => {
  const {
    children,
    spinner,
    size,
    styl,
    ...restProps
  } = props;

  const getSize = (val) => {
    switch (val) {
      case 'small':
        return s.small;
      default:
        return null;
    }
  };

  const getStyle = (val) => {
    switch (val) {
      case 'secondary':
        return s.secondary;
      default:
        return null;
    }
  };

  const className = cx(
    s.button,
    getSize(size),
    getStyle(styl)
  );

  return (
    <button
      type="button"
      className={className}
      {...restProps}
    >
      {spinner ? <Spinner /> : children}
    </button>
  );
};

export default Button;
