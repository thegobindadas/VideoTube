import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  videoInfo: null,
  loading: false,
  error: null,
};

const videoInfoSlice = createSlice({
  name: 'videoInfo',
  initialState,
  reducers: {
    setVideoInfo: (state, action) => {
      state.videoInfo = action.payload;
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
    resetVideoInfo: (state) => {
      state.videoInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
});



export const { setVideoInfo, setLoading, setError, resetVideoInfo } = videoInfoSlice.actions;

export default videoInfoSlice.reducer;