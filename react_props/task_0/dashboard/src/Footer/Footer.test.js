/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react"
import Footer from "./Footer";



  test('renders App footer text', () => {
    render(<Footer />);
    const bodyElement = screen.getByText(/Copyright 2024 - holberton School/i);
    expect(bodyElement.closest('.App-footer')).toBeInTheDocument();
  });

