import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice"
import videoSlice from "./videoSlice"
import watchHistorySlice from "./watchHistorySlice"
import commentSlice from "./commentSlice"
import recommendedVideosSlice from "./recommendedVideosSlice"
import channelSlice from "./channelSlice"
import channelVideoSlice from "./channelVideoSlice"
import ownerSlice from "./ownerSlice"
import userPlaylistsSlice from "./userPlaylistsSlice"


const store = configureStore({
    reducer: {
        user : userSlice,
        owner: ownerSlice,
        videos: videoSlice,
        watchHistory: watchHistorySlice,
        comments: commentSlice,
        recommendedVideos: recommendedVideosSlice,
        channel: channelSlice,
        channelVideos: channelVideoSlice,
        userPlaylists: userPlaylistsSlice,
    }
});


export default store;