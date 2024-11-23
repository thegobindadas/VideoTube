import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subscribedChannels: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    totalSubscribedChannels: 0,
    totalPages: 0,
    currentPage: 1,
};

const subscribedChannelSlice = createSlice({
    name: 'subscribedChannels',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSubscribedChannels: (state, action) => {
            const { subscribedChannels, totalSubscribedChannels, totalPages, currentPage } = action.payload;

            // Filter out already existing channels based on _id
            const newChannels = subscribedChannels.filter(newChannel => 
                !state.subscribedChannels.some(existingChannel => existingChannel._id === newChannel._id)
            );

            state.subscribedChannels = [...state.subscribedChannels, ...newChannels];
            state.totalSubscribedChannels = totalSubscribedChannels;
            state.totalPages = totalPages;
            state.currentPage = currentPage;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        resetSubscribedChannels: (state) => {
            state.subscribedChannels = [];
            state.page = 1;
            state.hasMore = true;
            state.totalSubscribedChannels = 0;
            state.totalPages = 0;
            state.currentPage = 1;
        },
    },
});

export const { 
    setSubscribedChannels, 
    setLoading, 
    setError, 
    setPage, 
    setHasMore, 
    resetSubscribedChannels 
} = subscribedChannelSlice.actions;

export default subscribedChannelSlice.reducer;