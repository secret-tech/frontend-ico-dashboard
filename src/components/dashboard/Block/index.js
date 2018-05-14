import React from 'react';
import s from './styles.scss';

import BlockPlaceholder from '../BlockPlaceholder';

const Block = (props) => {
  const {
    value,
    label,
    fetching,
    placeholderWidth
  } = props;

  return fetching
    ? <BlockPlaceholder width={placeholderWidth}/>
    : (
      <div>
        <div className={s.val}>{value}</div>
        <div className={s.label}>{label}</div>
      </div>
    );
};

export default Block;
