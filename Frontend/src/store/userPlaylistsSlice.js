import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlists: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
};

const userPlaylistsSlice = createSlice({
    name: 'userPlaylists',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPlaylists: (state, action) => {
            const newPlaylists = action.payload.filter(newPlaylist =>
                !state.playlists.some(existingPlaylist => existingPlaylist._id === newPlaylist._id)
            );
            state.playlists = [...state.playlists, ...newPlaylists];
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        resetPlaylists: (state) => {
            state.playlists = [];
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        },
    },
});


export const {
    setLoading,
    setError,
    setPlaylists,
    setPage,
    setHasMore,
    resetPlaylists,
} = userPlaylistsSlice.actions;

export default userPlaylistsSlice.reducer;
