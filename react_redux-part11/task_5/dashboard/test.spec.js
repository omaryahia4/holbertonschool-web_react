import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CourseList from './src/pages/CourseList/CourseList';
import coursesReducer from './src/features/courses/coursesSlice';
const {StyleSheetTestUtils} = require("aphrodite");

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: {
      courses: coursesReducer,
    },
    preloadedState: {
      courses: preloadedState,
    },
  });
};

describe('CourseList Component', () => {
  it('renders the list of courses when courses are available', () => {
    const store = createMockStore({
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    });
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText('Available courses')).toBeInTheDocument();
    expect(screen.getByText('Course name')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the "No course available yet" message when no courses are available', () => {
    const store = createMockStore({
      courses: [],
    });
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText('No course available yet')).toBeInTheDocument();
  });
});
StyleSheetTestUtils.suppressStyleInjection();