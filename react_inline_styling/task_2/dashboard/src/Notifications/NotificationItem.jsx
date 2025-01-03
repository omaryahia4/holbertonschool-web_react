import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
});

class NotificationItem extends PureComponent {
  render() {
    const { type, value, html, markAsRead } = this.props;

    return (
      <li
        className={css(type === 'default' ? styles.default : styles.urgent)}
        data-notification-type={type}
        dangerouslySetInnerHTML={type === 'urgent' && html !== undefined ? html : undefined}
        onClick={markAsRead}
      >
        {type === 'urgent' && html !== undefined ? null : value}
      </li>
    );
  }
}

export default NotificationItem;
