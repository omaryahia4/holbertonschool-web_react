import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils'; 
const API_BASE_URL = 'http://localhost:5173';

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};


const initialState = {
  notifications: [],
  displayDrawer: true,
};


export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(ENDPOINTS.notifications);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();


      const updatedNotifications = data.map((notification) => {
        if (notification.id === 3) {
          return {
            ...notification,
            message: getLatestNotification(),
          };
        }
        return notification;
      });

      return updatedNotifications;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const { id } = action.payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
      console.log(`Removed notification with id: ${id}`);
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        console.error('Error fetching notifications:', action.payload);
      });
  },
});


export const { markNotificationAsRead, showDrawer, hideDrawer } =
  notificationsSlice.actions;


export default notificationsSlice.reducer;
