import notificationsReducer, {
    fetchNotifications,
    markNotificationAsRead,
    showDrawer,
    hideDrawer,
  } from '../notifications/notificationsSlice';

  
  jest.mock('../../utils/utils', () => ({
    getLatestNotification: jest.fn(() => 'This is the latest notification.'),
  }));
  
  const mockNotifications = [
    { id: 1, message: 'Notification 1', type: 'info' },
    { id: 2, message: 'Notification 2', type: 'warning' },
    { id: 3, message: 'Notification 3', type: 'alert' },
  ];
  
  describe('notificationsSlice', () => {
    const initialState = {
      notifications: [],
      displayDrawer: true,
    };
  
    it('should return the correct initial state by default', () => {
      const state = notificationsReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });
  
    it('should fetch notifications data correctly', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockNotifications),
        })
      );
  
      const action = fetchNotifications();
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ notifications: initialState }));
  
      await action(dispatch, getState, undefined);
  
      const expectedNotifications = mockNotifications.map((notification) =>
        notification.id === 3
          ? { ...notification, message: 'This is the latest notification.' }
          : notification
      );
  
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'notifications/fetchNotifications/fulfilled',
          payload: expectedNotifications,
        })
      );
  
      global.fetch.mockRestore();
    });
  
    it('should remove a notification correctly when markNotificationAsRead is dispatched', () => {
      const state = {
        notifications: mockNotifications,
        displayDrawer: true,
      };
  
      const action = markNotificationAsRead({ id: 2 });
      const newState = notificationsReducer(state, action);
  
      expect(newState.notifications).toEqual([
        { id: 1, message: 'Notification 1', type: 'info' },
        { id: 3, message: 'Notification 3', type: 'alert' },
      ]);
    });
  
    it('should toggle the displayDrawer state correctly when showDrawer and hideDrawer actions are dispatched', () => {
      const actionShow = showDrawer();
      const stateAfterShow = notificationsReducer(initialState, actionShow);
  
      expect(stateAfterShow.displayDrawer).toBe(true);
  

      const actionHide = hideDrawer();
      const stateAfterHide = notificationsReducer(stateAfterShow, actionHide);
  
      expect(stateAfterHide.displayDrawer).toBe(false);
    });
  });
  