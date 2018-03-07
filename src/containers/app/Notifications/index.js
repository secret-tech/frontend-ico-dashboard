import React from 'react';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

const NotificationsComponent = (props) => {
  const { notifications } = props;

  const style = {
    NotificationItem: {
      DefaultStyle: {
        width: '352px',
        padding: '15px 25px',
        font: 'normal 14px Roboto',
        color: '#fff',
        backgroundColor: '#222',
        borderRadius: '3px',
        border: 'none',
        textAlign: 'center',
        boxShadow: '0 8px 24px 0 rgba(16, 22, 26, 0.4), 0 2px 4px 0 rgba(16, 22, 26, 0.4), 0 0 0 1px rgba(16, 22, 26, 0.2)',
        margin: '30px 0 0 -25px'
      },

      success: {
        backgroundColor: '#00DC85'
      },

      error: {
        backgroundColor: '#db3737'
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
