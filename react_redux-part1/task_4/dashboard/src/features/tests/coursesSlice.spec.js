import { configureStore } from '@reduxjs/toolkit';
import coursesSlice, { fetchCourses } from '../courses/coursesSlice';
import axios from 'axios';
import { logout } from '../auth/authSlice';

jest.mock('axios');

describe('coursesSlice', () => {
  let store;

  beforeEach(() => {

    store = configureStore({
      reducer: {
        courses: coursesSlice,
      },
    });
  });

  it('should return the correct initial state', () => {
    const initialState = {
      courses: [],
    };
    expect(store.getState().courses).toEqual(initialState);
  });

  it('should fetch the courses data correctly', async () => {
    const mockCourses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];

    axios.get.mockResolvedValue({ data: mockCourses });

    await store.dispatch(fetchCourses());

    const state = store.getState().courses;

    expect(state.courses).toEqual(mockCourses);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
  });

  it('should reset the courses array to empty when logout is dispatched', async () => {
    const mockCourses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];

    axios.get.mockResolvedValue({ data: mockCourses });

    await store.dispatch(fetchCourses());

    store.dispatch(logout());

    const state = store.getState().courses;

    expect(state.courses).toEqual([]);
  });
});