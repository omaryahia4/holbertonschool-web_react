/**
 * @jest-environment jsdom
 */

import React from "react";
import {render} from "@testing-library/react"
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
