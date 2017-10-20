import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { fetchUser } from '../../../redux/modules/app/app';

import Sidebar from '../../../components/app/Sidebar';
import Topbar from '../../../components/app/Topbar';
import MakeDepositPopup from '../MakeDepositPopup';

class AppWrapper extends Component {
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

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

        <MakeDepositPopup/>
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchUser
  }
)(AppWrapper);
