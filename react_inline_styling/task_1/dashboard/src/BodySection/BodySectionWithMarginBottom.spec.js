import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
const {StyleSheetTestUtils} = require("aphrodite");

describe('BodySectionWithMarginBottom', () => {

  test('renders a div with the class of bodySectionWithMargin', () => {
    render(<BodySectionWithMarginBottom title="Test Title" />);
    const containerDiv = screen.getByTestId('body-section-with-margin');
    expect(containerDiv).toHaveClass('bodySectionWithMargin');

  });

  test('renders the BodySection component with the correct title and content', () => {
    const title = 'Test Title';
    const content = 'Test Content';

    render(
      <BodySectionWithMarginBottom title={title}>
        {content}
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
StyleSheetTestUtils.suppressStyleInjection();
