import React from 'react';
import s from './styles.scss';

const BlockPlaceholder = ({ width }) => (
  <div>
    <div className={s.label} style={{ width: width.label }}>&zwnj;</div>
    <div className={s.val} style={{ width: width.val }}>&zwnj;</div>
  </div>
);

export default BlockPlaceholder;
