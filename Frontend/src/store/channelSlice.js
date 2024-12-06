import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  channel: null,
  loading: false,
  error: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelData: (state, action) => {
      state.channel = action.payload;
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
    resetChannelData: (state) => {
      state.channel = null;
      state.loading = false;
      state.error = null;
    },
  },
});



export const { setChannelData, setLoading, setError, resetChannelData } = channelSlice.actions;

export default channelSlice.reducer;
