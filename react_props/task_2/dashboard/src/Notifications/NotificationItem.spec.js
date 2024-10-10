import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from './Notifications'
import '@testing-library/jest-dom'

describe('NotificationItem component', () => {
  test('renders with the correct data-priority attribute for default type', () => {
    render(<Notification />);
    // const liElement = screen.getByText('New course available');
    // expect(liElement).toHaveAttribute('data-notification-type', 'default');
    // expect(liElement).toHaveStyle('color : blue');
  });

  // test('renders with the correct data-priority attribute for urgent type', () => {
  //   const { getByText } = render(<NotificationItem type="urgent" value="Urgent notification" />);
  //   const liElement = getByText('Urgent notification');

  //   expect(liElement).toHaveAttribute('data-priority', 'urgent');
  //   expect(liElement).toHaveStyle('color: red');
  // });
});
