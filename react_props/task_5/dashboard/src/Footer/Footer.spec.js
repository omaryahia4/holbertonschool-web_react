/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react"
import Footer from "./Footer";
import { getFooterCopy } from '../Utils/utils';

  jest.mock('../Utils/utils', () => ({
    getFooterCopy: jest.fn(),
    getFullYear: jest.fn()
  }));

  describe('Footer Component', () => {

  test('renders correct copyright string when getFooterCopy returns true', () => {
    getFooterCopy.mockReturnValue('Holberton School');
    render(<Footer />);
    const paragraphElement = screen.getByText((content, element) =>
      content.startsWith('Copyright') && 
      content.includes('Holberton School')
    );

    expect(paragraphElement).toBeInTheDocument();
  });
  })
