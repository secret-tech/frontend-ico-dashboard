import React from 'react';
import { Spinner } from '@blueprintjs/core';

import s from './styles.css';

const Preloader = (props) => (
  <div className={s.preloader}>
    <Spinner className="pt-large" {...props}/>
  </div>
);

export default Preloader;
