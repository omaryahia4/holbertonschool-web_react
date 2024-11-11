import React from "react";
import {render, screen, fireEvent} from "@testing-library/react"
import App from './App'
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";


  test('renders App component without craching', () => {
    render(<App />);
  });

  test('renders Header component without craching', () => {
    render(<Header />);

  });

  test('renders Login component without craching', () => {
    render(<Login />);
    
  });

  test('renders Footer component without craching', () => {
    render(<Footer />);
    
  });

  test('renders Notifications component without craching', () => {
    render(<Notifications />);
    
  });

  test('renders 2 input elements and a button with the text "OK" when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);

    const emailInput = screen.getAllByRole('textbox');
    expect(emailInput.length).toBe(1);

    const passwordInput = screen.getByText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: 'OK' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders a table element when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  window.alert = jest.fn();

  test('calls logOut when Ctrl + H is pressed', () => {
    const logOutMock = jest.fn();
    const { container } = render(<App isLoggedIn={true} logOut={logOutMock} />);

    fireEvent.keyDown(container, { key: 'h', ctrlKey: true });

    expect(logOutMock).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out" when Ctrl + H is pressed', () => {

    render(<App isLoggedIn={true} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(global.alert).toHaveBeenCalledWith('Logging you out');
  });