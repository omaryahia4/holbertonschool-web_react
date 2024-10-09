import React from 'react'
import PropTypes from 'prop-types';

const NotificationItem = ({ type, value, html }) => {
    return (
      <li data-notification-type={type}>
        {html ? <span dangerouslySetInnerHTML={{ __html: html.__html }} /> : value}
      </li>
    );
  };

  NotificationItem.propTypes = {
    type: PropTypes.string.isRequired,
    html: PropTypes.shape({ __html: PropTypes.string }),
    value: PropTypes.string,
  };
  
  NotificationItem.defaultProps = {
    type: 'default',
  };

export default NotificationItem;