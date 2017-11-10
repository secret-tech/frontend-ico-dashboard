import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import s from './styles.css';

import Spinner from '../Spinner';

const cx = classNames.bind(s);

const Button = (props) => {
  const {
    children,
    spinner,
    size,
    styl,
    href,
    to,
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

  const renderElement = () => {
    if (href) {
      return (
        <a
          href={href}
          className={className}
          {...restProps}>
          {spinner ? <Spinner /> : children}
        </a>
      );
    }

    if (to) {
      return (
        <Link
          to={to}
          className={className}
          {...restProps}>
          {spinner ? <Spinner /> : children}
        </Link>
      );
    }

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

  return renderElement();
};

export default Button;
