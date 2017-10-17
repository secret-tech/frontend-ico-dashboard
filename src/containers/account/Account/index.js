import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import Info from '../Info';
import EditAccountPopup from '../EditAccountPopup';
import TwoFactorAuth from '../TwoFactorAuth';
import Address from '../../../components/account/Address';

class Account extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.info}>
            <Info/>
          </div>

          <div className={s.tfa}>
            <TwoFactorAuth/>
          </div>

          <div className={s.address}>
            <Address address="fetch me!"/>
          </div>
        </div>

        <EditAccountPopup/>
      </div>
    );
  }
}

export default connect(
  null
)(Account);
