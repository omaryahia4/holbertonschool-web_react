import React from "react";
import {render, screen} from "@testing-library/react"
import App from "./App";
import { getFooterCopy, getCurrentYear, getLatestNotification  } from './utils';


jest.mock('./utils', () => ({
  getFooterCopy: jest.fn(),
  getCurrentYear: jest.fn(),
  getLatestNotification : jest.fn()
}));

test('renders School Dashboard heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /School dashboard/i });
    expect(headingElement).toBeInTheDocument();

  });

  test('renders App body text', () => {
    render(<App />);
    const bodyElement = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyElement.closest('.App-body')).toBeInTheDocument();
  });

  test('renders correct copyright string when getFooterCopy returns true', () => {
    getFooterCopy.mockReturnValue('Holberton School');
    render(<App />);
    const paragraphElement = screen.getByText((content, element) =>
      content.startsWith('Copyright') && 
      content.includes('Holberton School')
    );

    expect(paragraphElement).toBeInTheDocument();
  });

  test('renders App img', () => {
    render(<App />);
    const imgElement = screen.getByRole('img', { name: /logo/i });
    expect(imgElement).toBeInTheDocument();
  });

  test('renders 2 input elements', () => {
    render(<App />);
    const inputElements = screen.getAllByRole('textbox');
    const passwordInputs = screen.getAllByRole('textbox', { hidden: true });
    expect(inputElements.length + passwordInputs.length).toBe(2);

  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);
    const emailInput = screen.getByText(/email/i);
    const passwordInput = screen.getByText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders a button with the text OK', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /ok/i });
    expect(buttonElement).toBeInTheDocument();
  });
