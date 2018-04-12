import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner';

const cx = classNames;

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
        return null;
      default:
        return 'pt-large';
    }
  };

  const getStyle = (val) => {
    switch (val) {
      case 'secondary':
        return null;
      case 'success':
        return 'pt-intent-success';
      default:
        return 'pt-intent-primary';
    }
  };

  const className = cx(
    'pt-button pt-fill',
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
