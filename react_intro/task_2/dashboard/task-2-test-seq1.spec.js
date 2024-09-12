import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './src/Notifications';

test('it should display a title, button and a 3 list items', () => {
  render(<Notifications />)

  const notificationsTitle = screen.getByText('Here is the list of notifications');
  const notificationsButton = screen.getByRole('button');
  const notificationsListItems = screen.getAllByRole('listitem');

  expect(notificationsTitle).toBeInTheDocument();
  expect(notificationsButton).toBeInTheDocument();
  expect(notificationsListItems).toHaveLength(3);
});

test('it should log "Close button has been clicked" whenever the close button is clicked', () => {
  render(<Notifications />);

  const notificationsButton = screen.getByRole('button');
  const consoleSpy = jest.spyOn(console, 'log');
  fireEvent.click(notificationsButton);

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));

  consoleSpy.mockRestore();
});

test('Check if "urgent requirement" string within <strong> tag', () => {
    render(<Notifications />);

    const urgentRequirementElement = screen.getByText(/urgent requirement/i);
    expect(urgentRequirementElement.tagName).toBe('STRONG');
});