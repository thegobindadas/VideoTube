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
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setHistory: (state, action) => {
            // Append unique history entries by checking their _id
            const newHistory = action.payload.filter(newEntry =>
                !state.history.some(existingEntry => existingEntry._id === newEntry._id)
            );
            state.history = [...state.history, ...newHistory];
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
            state.hasMore = true;
        },
    },
});


export const { 
    setHistory, 
    setLoading, 
    setError, 
    setPage, 
    setHasMore, 
    resetHistory, 
} = watchHistorySlice.actions;

export default watchHistorySlice.reducer;