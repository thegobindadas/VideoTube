import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice"
import videoSlice from "./videoSlice"
import watchHistorySlice from "./watchHistorySlice"
import commentSlice from "./commentSlice"
import recommendedVideosSlice from "./recommendedVideosSlice"


const store = configureStore({
    reducer: {
        user : userSlice,
        videos: videoSlice,
        watchHistory: watchHistorySlice,
        comments: commentSlice,
        recommendedVideos: recommendedVideosSlice
    }
});


export default store;