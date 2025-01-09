import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App/App';
import { newContext } from '../Context/context';

describe('CourseList Component', () => {
  test('renders 5 different rows when user is logged in', () => {
    const mockUser = {
      isLoggedIn: true,
    };
    render(
      <newContext.Provider value={{ user: mockUser,}}>
        <App isLoggedIn={mockUser.isLoggedIn} />
      </newContext.Provider>
    );
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5); 
  });
});
