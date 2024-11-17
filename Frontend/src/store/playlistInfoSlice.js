import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  playlistInfo: null,
  loading: false,
  error: null,
};

const playlistInfoSlice = createSlice({
  name: 'playlistInfo',
  initialState,
  reducers: {
    setPlaylistInfo: (state, action) => {
      state.playlistInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetPlaylistInfo: (state) => {
      state.playlistInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
});



export const {
  setPlaylistInfo,
  setLoading,
  setError,
  resetPlaylistInfo,
} = playlistInfoSlice.actions;

export default playlistInfoSlice.reducer;