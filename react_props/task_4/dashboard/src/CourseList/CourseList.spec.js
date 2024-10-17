import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList Component', () => {
  test('renders 5 different rows', () => {
    render(<CourseList />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5); 
  });
});
