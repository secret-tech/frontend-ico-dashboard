import React, { Component } from 'react';
import s from './styles.css';

import Sidebar from '../../../components/app/Sidebar';
import Topbar from '../../../components/app/Topbar';

class AppWrapper extends Component {
  render() {
    const {
      children,
      location: {
        pathname
      }
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.sidebar}>
          <Sidebar/>
        </div>
        <div className={s.main}>
          <Topbar pathname={pathname}/>
          <div className={s.children}>{children}</div>
        </div>
      </div>
    );
  }
}

export default AppWrapper;
