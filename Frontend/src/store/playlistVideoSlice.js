import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    playlistVideos: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
};

const playlistVideoSlice = createSlice({
    name: 'playlistVideos',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPlaylistVideos: (state, action) => {
            const newVideos = action.payload.filter(newVideo =>
                !state.playlistVideos.some(existingVideo => existingVideo._id === newVideo._id)
            );
            state.playlistVideos = [...state.playlistVideos, ...newVideos];
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        resetPlaylistVideos: (state) => {
            state.playlistVideos = [];
            state.page = 1;
            state.hasMore = true;
            state.loading = false;
            state.error = null;
        },
    },
});


export const {
    setLoading,
    setError,
    setPlaylistVideos,
    setPage,
    setHasMore,
    resetPlaylistVideos,
} = playlistVideoSlice.actions;

export default playlistVideoSlice.reducer;
