import React from 'react'

const NotificationItem = ({ type, value, html }) => {
  return(
  <li
    style={{ color: type === 'default' ? 'blue' : 'red' }}
    data-notification-type={type}
    dangerouslySetInnerHTML={type === 'urgent' && html !== undefined ? html : undefined}
  >
    {type === 'urgent' && html !== undefined ? null : value}
  </li>
  )};

export default NotificationItem;