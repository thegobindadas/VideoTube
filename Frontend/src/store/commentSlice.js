import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setComments: (state, action) => {
            const newComments = action.payload.filter(newComment => 
                !state.comments.some(existingComment => existingComment._id === newComment._id)
            );
            state.comments = [...state.comments, ...newComments];
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        resetComments: (state) => {
            state.comments = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
});


export const { 
    setComments, 
    setLoading, 
    setError, 
    setPage, 
    setHasMore, 
    resetComments, 
} = commentSlice.actions;

export default commentSlice.reducer;
