import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    history: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
};

const watchHistorySlice = createSlice({
    name: 'watchHistory',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
            if (action.payload) state.error = null;
        },        
        setError: (state, action) => {
            state.error = action.payload;
        },
        setHistory: (state, action) => {
            const existingIds = new Set(state.history.map(entry => entry._id));
            const newHistory = action.payload.filter(newEntry => !existingIds.has(newEntry._id));
            state.history = [...state.history, ...newHistory];
        },
        setSingleVideo: (state, action) => {
            const newVideo = action.payload;
        
            const exists = state.history.some(video => video._id === newVideo._id);
            if (!exists) {
                state.history = [newVideo, ...state.history];
            } else {
                state.history = state.history.map(video =>
                    video._id === newVideo._id ? newVideo : video
                );
            }
        },        
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        resetHistory: (state) => {
            state.history = [];
            state.page = 1;
            state.loading = false
            state.hasMore = true;
            state.error = null;
        },
    },
});



export const { 
    setHistory,
    setSingleVideo,
    setLoading, 
    setError, 
    setPage, 
    setHasMore, 
    resetHistory, 
} = watchHistorySlice.actions;

export default watchHistorySlice.reducer;