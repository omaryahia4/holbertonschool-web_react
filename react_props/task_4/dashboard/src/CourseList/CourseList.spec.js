import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList Component', () => {
  test('renders 5 different rows', () => {
    render(<CourseList />);

    // Check if the 5 rows are rendered
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5); // 2 rows in thead, 3 rows in tbody
  });
});
