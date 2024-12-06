import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  videos: [],
  loading: false,
  error: null,
}

const recommendedVideoSlice = createSlice({
  name: 'recommendedVideos',
  initialState,
  reducers: {
    setRecommendedVideos: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) state.error = null;
  },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetRecommendedVideos: (state) => {
      state.videos = [];
      state.loading = false;
      state.error = null;
    },
  },
});



export const { setRecommendedVideos, setLoading, setError, resetRecommendedVideos } = recommendedVideoSlice.actions;

export default recommendedVideoSlice.reducer;
