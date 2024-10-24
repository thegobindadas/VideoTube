import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true
};

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setVideos: (state, action) => {
            // Append unique videos by checking their _id
            const newVideos = action.payload.filter(newVideo => 
                !state.videos.some(existingVideo => existingVideo._id === newVideo._id)
            );
            state.videos = [...state.videos, ...newVideos];
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
