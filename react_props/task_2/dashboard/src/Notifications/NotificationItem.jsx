import React from 'react'

const NotificationItem = ({ type, value, html }) => {
    return (
      <li data-notification-type={type}>
        {html ? <span dangerouslySetInnerHTML={{ __html: html.__html }} /> : value}
      </li>
    );
  };

export default NotificationItem;