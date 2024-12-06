import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  watchHistory: JSON.parse(localStorage.getItem('user'))?.watchHistory || [],
  subscribers: [],
  subscribedChannels: [],
  status: !!JSON.parse(localStorage.getItem('user')),
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
      state.status = true;
    },
    logoutUser(state) {
      state.user = null;
      state.watchHistory = [];
      localStorage.removeItem('user');
      state.status = false;
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
  addToWatchHistory,
} = userSlice.actions;


export default userSlice.reducer;