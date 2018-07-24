import React from 'react';
import classnames from 'classnames/bind';
import s from './styles.scss';

const cx = classnames.bind(s);

const Block = (props) => {
  const {
    value,
    label,
    fetching
  } = props;

  return (
    <div className={s.block}>
      <div className={cx(s.val, fetching && 'pt-skeleton')}>
        {value}
      </div>
      <div className={cx(s.label, fetching && 'pt-skeleton')}>
        {label}
      </div>
    </div>
  );
};

export default Block;
