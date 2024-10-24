import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
};

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = [...state.videos, ...action.payload];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
    },
});


export const { setVideos, setLoading, setError, setPage, setHasMore } = videoSlice.actions;

export default videoSlice.reducer;
