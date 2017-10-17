import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openEditAccountPopup } from '../../../redux/modules/account/editAccount';

import Button from '../../../components/common/Button';

const Info = (props) => {
  const { openEditAccountPopup } = props;

  return (
    <div className={s.info}>
      <div className={s.name}>
        Hello,<br/>
        Walter White!
      </div>

      <div className={s.email}>ww@crime.net</div>

      <div className={s.edit}>
        <Button
          type="button"
          size="small"
          onClick={() => openEditAccountPopup()}>
          Edit account details
        </Button>
      </div>

      <div className={s.logout}>
        <Button
          type="button"
          size="small"
          styl="secondary">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default connect(
  null,
  {
    openEditAccountPopup
  }
)(Info);
