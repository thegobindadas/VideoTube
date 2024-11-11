import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ownerInfo: null,
  loading: false,
  error: null,
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setOwnerInfo: (state, action) => {
      state.ownerInfo = action.payload;
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
    resetOwnerInfo: (state) => {
      state.ownerInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
});


export const { setOwnerInfo, setLoading, setError, resetOwnerInfo } = ownerSlice.actions;

export default ownerSlice.reducer;
