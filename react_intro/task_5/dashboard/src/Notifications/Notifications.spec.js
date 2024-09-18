import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from '../Notifications/Notifications';


describe('Notifications component', () => {

  test('renders the notifications title', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders three notifications', () => {
    render(<Notifications />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(3);
  });

  test('logs message when close button is clicked', () => {
    render(<Notifications />);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const buttonElement = screen.getByRole('button', { name: /close/i });
    fireEvent.click(buttonElement);
    expect(consoleLogSpy).toHaveBeenCalledWith('Close button has been clicked');
  });

});