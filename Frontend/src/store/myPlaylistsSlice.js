import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlists: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    savingToPlaylist: false,
};

const myPlaylistsSlice = createSlice({
    name: 'myPlaylists',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setPlaylists: (state, action) => {
            const newPlaylists = action.payload.playlists.filter(newPlaylist =>
                !state.playlists.some(existingPlaylist => existingPlaylist._id === newPlaylist._id)
            );
            state.playlists = [...state.playlists, ...newPlaylists];
            state.loading = false;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        saveVideoToPlaylist: (state, action) => {
            const { videoId, playlistId } = action.payload;
            const playlist = state.playlists.find((pl) => pl._id === playlistId);

            if (playlist && !playlist.videos.includes(videoId)) {
                playlist.videos.push(videoId);
            }
        },
        removeVideoFromPlaylist: (state, action) => {
            const { videoId, playlistId } = action.payload;
            const playlist = state.playlists.find((pl) => pl._id === playlistId);

            if (playlist) {
                playlist.videos = playlist.videos.filter((vid) => vid !== videoId);
            }
        },
        createPlaylist: (state, action) => {
            const newPlaylist = action.payload;
            state.playlists.push(newPlaylist);
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
    saveVideoToPlaylist,
    removeVideoFromPlaylist,
    createPlaylist,
    resetPlaylists,
} = myPlaylistsSlice.actions;

export default myPlaylistsSlice.reducer;
