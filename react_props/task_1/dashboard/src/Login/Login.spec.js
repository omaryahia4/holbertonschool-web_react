/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Login from "/home/omar/HBTN_curr_test/holbertonschool-web_react/react_props/task_1/dashboard/Login-test.jsx";



  test('renders App body text', () => {
    render(<Login />);
    const bodyElement = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyElement.closest('.App-body')).toBeInTheDocument();
  });


  test('renders 2 input elements', () => {
    render(<Login/>);
    const inputElements = screen.getAllByRole('textbox');
    expect(inputElements.length).toBe(2);

  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<Login />);
    const emailInput = screen.getByText(/email/i);
    const passwordInput = screen.getByText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders a button with the text OK', () => {
    render(<Login />);
    const buttonElement = screen.getByRole('button', { name: /ok/i });
    expect(buttonElement).toBeInTheDocument();
  });


  test('focuses the email input when the email label is clicked', async() => {
    render(<Login />);
    const emailLabel = screen.getByLabelText(/email/i);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await userEvent.click(emailLabel);

    expect(emailInput).toHaveFocus();
  });
