import React from 'react';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

const NotificationsComponent = (props) => {
  const { notifications } = props;

  const style = {
    NotificationItem: {
      DefaultStyle: {
        padding: '15px 25px',
        font: 'normal 16px Roboto',
        color: '#fff',
        backgroundColor: '#222',
        borderRadius: '4px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'none',
        margin: '5px 0'
      },

      success: {
        backgroundColor: '#00DC85'
      },

      error: {
        backgroundColor: '#FF4C4C'
      },

      warning: {
        backgroundColor: '#FFD203'
      },

      info: {
        backgroundColor: '#0080FF'
      }
    }
  };

  return (
    <Notifications
      style={style}
      notifications={notifications}/>
  );
};

export default connect((state) => ({
  notifications: state.notifications
}))(NotificationsComponent);
