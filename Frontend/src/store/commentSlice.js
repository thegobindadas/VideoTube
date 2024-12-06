import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    videoComments: [],
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
            if (action.payload) state.error = null;
        },        
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Automatically stop loading on error
        },        
        setVideoComments: (state, action) => {
            const existingIds = new Set(state.videoComments.map(comment => comment._id));
            const newComments = action.payload.filter(newComment => !existingIds.has(newComment._id));
            state.videoComments = [...state.videoComments, ...newComments];
        }, 
        setSingleCommentForVideo: (state, action) => {
            const newComment = action.payload;
            const exists = state.videoComments.some(comment => comment._id === newComment._id);
            state.videoComments = exists
                ? state.videoComments.map(comment =>
                      comment._id === newComment._id ? newComment : comment
                  )
                : [newComment, ...state.videoComments];
        },
        updateComment: (state, action) => {
            const updatedComment = action.payload;
            state.videoComments = state.videoComments.map(comment =>
                comment._id === updatedComment._id ? { ...comment, ...updatedComment } : comment
            );
        },
        deleteComment: (state, action) => {
            const commentId = action.payload;
            state.videoComments = state.videoComments.filter(comment => comment._id !== commentId);
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        resetVideoComments: (state) => {
            state.videoComments = [];
            state.page = 1;
            state.hasMore = true;
            state.loading = false; // Reset loading state
            state.error = null;    // Reset error state
        },        
    },
});



export const {
    setVideoComments,
    setSingleCommentForVideo,
    updateComment,
    deleteComment,
    setLoading,
    setError,
    setPage,
    setHasMore,
    resetVideoComments,
} = commentSlice.actions;

export default commentSlice.reducer;
