import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';


test('Check whether the li element notification has the color blue when the type is set to be "defaut"', () => {
  render(<NotificationItem type="default" />);
  const liElement = screen.getByRole('listitem');
  expect(liElement).toHaveStyle({ color: 'blue' });
});

test('Check whether the li element notification has the color red when the type is set to be "urgent"', () => {
  render(<NotificationItem type="urgent" />);
  const liElement = screen.getByRole('listitem');
  expect(liElement).toHaveStyle({ color: 'red' });
});