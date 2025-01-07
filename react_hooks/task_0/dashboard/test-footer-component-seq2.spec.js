import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './src/Notifications/Notifications';


test('should return true if the Notifications component is a class pure component', () => {
	const props = Object.getOwnPropertyNames(Notifications.prototype);
	const isClassPureComponent = Notifications.prototype.__proto__ === React.PureComponent.prototype;
	const inheritsFromReactComponent = Object.getPrototypeOf(Notifications.prototype) === React.PureComponent.prototype;
	
	expect(props).toContain('constructor');
	expect(isClassPureComponent).toBe(true);
	expect(inheritsFromReactComponent).toBe(true);
});

test('it should rerender when prop values change', () => {
  const markAsReadMock = jest.fn();

  const initialProps = {
    displayDrawer: true,
    notifications: [
      { id: 1, type: 'default', value: 'New notification' },
      { id: 2, type: 'urgent', value: 'Urgent notification' }
    ],
    markNotificationAsRead: markAsReadMock,
  };

  const { rerender } = render(<Notifications {...initialProps} />);

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(2);

  fireEvent.click(screen.getByText('New notification'));

  expect(markAsReadMock).toHaveBeenCalledWith(1);

  const updatedProps = {
    ...initialProps,
    notifications: [
      { id: 2, type: 'urgent', value: 'Urgent notification' }
    ]
  };

  rerender(<Notifications {...updatedProps} />);

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});