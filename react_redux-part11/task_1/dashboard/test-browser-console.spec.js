import notificationsSlice, {
  fetchNotifications,
} from './src/features/notifications/notificationsSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

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

  describe('fetchNotifications async thunk', () => {
    test('should handle fetchNotifications.pending', () => {
      const action = { type: fetchNotifications.pending.type };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test('should handle fetchNotifications.rejected', () => {
      const action = {
        type: fetchNotifications.rejected.type,
      };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    // typo in "localhost"
    test('should handle fetchNotifications.rejected when base URL or port is incorrect', async () => {
      const incorrectBaseURL = 'http://loclhost:5173';
      mock.onGet(`${incorrectBaseURL}/notifications.json`).networkError();

      const dispatch = jest.fn();
      const getState = jest.fn();

      await fetchNotifications()(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: fetchNotifications.rejected.type,
        })
      );
    });

    // typo in "notifications"
    test('should handle fetchNotifications.rejected when endpoint is incorrect', async () => {
      const incorrectEndpoint = 'http://localhost:5173/notifictions.json';
      mock.onGet(incorrectEndpoint).reply(404);

      const dispatch = jest.fn();
      const getState = jest.fn();

      await fetchNotifications()(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: fetchNotifications.rejected.type,
        })
      );
    });

    test('should handle fetchNotifications.fulfilled when API request is successful', async () => {
      const notifications = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ];

      // intercept axios request
      mock.onGet('http://localhost:5173/notifications.json').reply(200, {
        notifications,
      });

      // make the API call
      const notificationsResponse = await axios.get('http://localhost:5173/notifications.json');
    
      const dispatch = jest.fn();
      const getState = jest.fn();
    
      await fetchNotifications()(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledTimes(2);
  
      const fulfilledAction = dispatch.mock.calls[1][0];
  
      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: fetchNotifications.fulfilled.type,
          payload: notificationsResponse.data.notifications,
        })
      );
    });
  });
});