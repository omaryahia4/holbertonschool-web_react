import React from "react";
import {render, screen} from "@testing-library/react"
import App from "./App";


test('renders School Dashboard heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/School Dashboard/i);
    expect(headingElement).toBeInTheDocument();
  });