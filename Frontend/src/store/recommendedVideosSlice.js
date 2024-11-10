import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    videos: [],
    loading: false,
    error: null,
  }


const recommendedVideosSlice = createSlice({
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


export const { setRecommendedVideos, setLoading, setError, resetRecommendedVideos } = recommendedVideosSlice.actions;

export default recommendedVideosSlice.reducer;
