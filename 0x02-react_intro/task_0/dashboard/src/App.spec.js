/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react"
import App from "./App";


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

  test('renders App footer text', () => {
    render(<App />);
    const bodyElement = screen.getByText(/Copyright 2024 - holberton School/i);
    expect(bodyElement.closest('.App-footer')).toBeInTheDocument();
  });

  test('renders App img', () => {
    render(<App />);
    const imgElement = screen.getByRole('img', { name: /logo/i });
    expect(imgElement).toBeInTheDocument();
  });
