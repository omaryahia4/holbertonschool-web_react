import notificationsSlice, {
    showDrawer,
    hideDrawer,
    markNotificationAsRead,
  } from './src/features/notifications/notificationsSlice';
  
  describe('notificationsSlice', () => {
    const initialState = {
      notifications: [],
      displayDrawer: true,
    };
  
    test('should return the initial state', () => {
      expect(notificationsSlice(undefined, { type: 'unknown' })).toEqual(
        initialState
      );
    });
  
    test('should handle showDrawer', () => {
      const action = showDrawer();
      const expectedState = {
        ...initialState,
        displayDrawer: true,
      };
      expect(notificationsSlice(initialState, action)).toEqual(expectedState);
    });
  
    test('should handle hideDrawer', () => {
      const stateWithDrawerClosed = {
        ...initialState,
        displayDrawer: false,
      };
      const action = hideDrawer();
      expect(notificationsSlice(initialState, action)).toEqual(
        stateWithDrawerClosed
      );
    });
  
    test('should handle markNotificationAsRead', () => {
      const stateWithNotifications = {
        ...initialState,
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
        ],
      };
  
      const action = markNotificationAsRead(1);
  
      const expectedState = {
        ...stateWithNotifications,
        notifications: [{ id: 2, message: 'Notification 2' }],
      };
  
      expect(notificationsSlice(stateWithNotifications, action)).toEqual(
        expectedState
      );
    });
  });