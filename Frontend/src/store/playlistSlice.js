import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlistInfo: {
    data: null,
    loading: false,
    error: null,
  },
  playlistVideos: {
    data: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    // Playlist Info Reducers
    setPlaylistInfo: (state, action) => {
      state.playlistInfo.data = action.payload;
      state.playlistInfo.loading = false;
      state.playlistInfo.error = null;
    },
    setPlaylistInfoLoading: (state, action) => {
      state.playlistInfo.loading = action.payload;
      if (action.payload) state.playlistInfo.error = null;
    },
    setPlaylistInfoError: (state, action) => {
      state.playlistInfo.error = action.payload;
      state.playlistInfo.loading = false;
    },
    resetPlaylistInfo: (state) => {
      state.playlistInfo = {
        data: null,
        loading: false,
        error: null,
      };
    },

    // Playlist Videos Reducers
    setPlaylistVideos: (state, action) => {
      const newVideos = action.payload.filter(
        (newVideo) =>
          !state.playlistVideos.data.some((existingVideo) => existingVideo._id === newVideo._id)
      );
      state.playlistVideos.data = [...state.playlistVideos.data, ...newVideos];
      state.playlistVideos.loading = false;
      state.playlistVideos.error = null;
    },
    setPlaylistVideosLoading: (state, action) => {
      state.playlistVideos.loading = action.payload;
      if (action.payload) state.playlistVideos.error = null;
    },
    setPlaylistVideosError: (state, action) => {
      state.playlistVideos.error = action.payload;
      state.playlistVideos.loading = false;
    },
    setPage: (state, action) => {
      state.playlistVideos.page = action.payload;
    },
    setHasMore: (state, action) => {
      state.playlistVideos.hasMore = action.payload;
    },
    resetPlaylistVideos: (state) => {
      state.playlistVideos = {
        data: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true,
      };
    },
  },
});



export const {
  setPlaylistInfo,
  setPlaylistInfoLoading,
  setPlaylistInfoError,
  resetPlaylistInfo,
  setPlaylistVideos,
  setPlaylistVideosLoading,
  setPlaylistVideosError,
  setPage,
  setHasMore,
  resetPlaylistVideos,
} = playlistSlice.actions;

export default playlistSlice.reducer;
