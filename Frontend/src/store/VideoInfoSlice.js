import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  videoInfo: null,
  loading: false,
  error: null,
};

const VideoInfoSlice = createSlice({
  name: 'VideoInfo',
  initialState,
  reducers: {
    setVideoInfo: (state, action) => {
      state.videoInfo = action.payload;
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
    resetVideoInfo: (state) => {
      state.videoInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
});


export const { setVideoInfo, setLoading, setError, resetVideoInfo } = VideoInfoSlice.actions;

export default VideoInfoSlice.reducer;