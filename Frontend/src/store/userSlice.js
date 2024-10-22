// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  subscriptions: [],
  watchHistory: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.watchHistory = [];
    },
    addSubscription(state, action) {
      state.subscriptions.push(action.payload);
    },
    removeSubscription(state, action) {
      state.subscriptions = state.subscriptions.filter(
        (channelId) => channelId !== action.payload
      );
    },
    addToWatchHistory(state, action) {
      state.watchHistory.push(action.payload);
    },
  },
});

export const {
  setUser,
  logoutUser,
  addSubscription,
  removeSubscription,
  addToWatchHistory,
} = userSlice.actions;


export default userSlice.reducer;