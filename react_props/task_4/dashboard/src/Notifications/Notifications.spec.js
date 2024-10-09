import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../Utils/utils';

// Mock the getLatestNotification function
jest.mock('../Utils/utils', () => ({
  getLatestNotification: jest.fn(),
}));

describe('Notifications component', () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue('<strong>Urgent requirement</strong> - complete by EOD');
  });

  test('renders the notifications title', () => {
    render(<Notifications displayDrawer = {true} />);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications displayDrawer = {true} />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders three notifications', () => {
    render(<Notifications displayDrawer = {true} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(3);
  });

  test('logs message when close button is clicked', () => {
    console.log = jest.fn();
    render(<Notifications displayDrawer = {true} />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    fireEvent.click(buttonElement);
    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });


  test('should display the 3 notification items with their given text', () => {
    render(<Notifications displayDrawer = {true} />);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(screen.getByText(/Urgent requirement/)).toBeInTheDocument();
  });

});