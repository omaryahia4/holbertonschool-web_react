/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react"
import App from './App'
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";


  // test('renders App component without craching', () => {
  //   render(<App />);
    
  // });

  // test('renders Header component without craching', () => {
  //   render(<Header />);
    
  // });

  // test('renders Login component without craching', () => {
  //   render(<Login />);
    
  // });

  // test('renders Footer component without craching', () => {
  //   render(<Footer />);
    
  // });

  // test('renders Notifications component without craching', () => {
  //   render(<Notifications />);
    
  // });

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
