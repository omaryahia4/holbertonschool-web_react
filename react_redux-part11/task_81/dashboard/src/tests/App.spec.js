import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mockAxios from "jest-mock-axios";
import App from "../App";
import rootReducer from "../app/rootReducer";

jest.mock("axios");

describe("App Component", () => {

  // Helper function to render App with a mock store
  const renderWithMockStore = (store) => {
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  test("renders Login component when isLoggedIn is false", () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: { user: { isLoggedIn: false } },
    });

    renderWithMockStore(mockStore);

    const loginTitle = screen.getByText("Log in to continue");
    expect(loginTitle).toBeInTheDocument();
  });

  test("renders CourseList component when isLoggedIn is true", async () => {
    const mockCourses = {
      courses: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
    };

    mockAxios.get.mockResolvedValueOnce({ data: mockCourses });

    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: { user: { isLoggedIn: true } },
    });

    renderWithMockStore(mockStore);

    const courseListTitle = await screen.findByText('Course list');
    expect(courseListTitle).toBeInTheDocument();
    expect(screen.getByText("ES6")).toBeInTheDocument();
    expect(screen.getByText("Webpack")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("fetches and displays notifications when App is rendered", async () => {
    const mockNotifications = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New course available soon" },
        { id: 3, type: "urgent", html: { __html: "Latest notification content" } },
      ],
    };

    mockAxios.get.mockResolvedValueOnce({ data: mockNotifications });

    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: { user: { isLoggedIn: true } },
    });

    renderWithMockStore(mockStore);

    // Check if notifications are displayed
    await waitFor(() => screen.findByText("New course available"));
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New course available soon")).toBeInTheDocument();
    // expect(screen.getByText("Latest notification content")).toBeInTheDocument();
  });

  test("verifies that notification items are removed and the correct log is printed when clicked", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    
    const mockNotifications = {
      data: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New course available soon" },
        ],
      },
    };
    
    mockAxios.get.mockResolvedValueOnce(mockNotifications);
    
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: { user: { isLoggedIn: true } },
    });
    
    renderWithMockStore(mockStore);
    
    await screen.findByText("New course available");
    
    const notificationItem = screen.getByText("New course available");
    fireEvent.click(notificationItem);

    // Check that the correct log is printed
    expect(console.log).toHaveBeenCalledWith("Notification 1 has been marked as read");

    // Verify that the notification item is removed from the list
    const notificationList = screen.queryByText("New course available");
    expect(notificationList).toBeNull();
  });
});

