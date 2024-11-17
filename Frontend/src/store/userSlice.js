import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  subscriptions: [],
  watchHistory: JSON.parse(localStorage.getItem('user'))?.watchHistory || [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.watchHistory = action.payload.watchHistory || [];
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.user = null;
      state.watchHistory = [];
      localStorage.removeItem('user');
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
      if (!state.watchHistory.includes(action.payload)) {
        state.watchHistory = [...state.watchHistory, action.payload];
        localStorage.setItem('user', JSON.stringify({ ...state.user, watchHistory: state.watchHistory }));
      }
    }
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