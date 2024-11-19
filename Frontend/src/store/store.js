import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice"
import videoSlice from "./videoSlice"
import watchHistorySlice from "./watchHistorySlice"
import commentSlice from "./commentSlice"
import recommendedVideosSlice from "./recommendedVideosSlice"
import channelSlice from "./channelSlice"
import channelVideoSlice from "./channelVideoSlice"
import userPlaylistsSlice from "./userPlaylistsSlice"
import VideoInfoSlice from "./VideoInfoSlice"
import playlistInfoSlice from "./playlistInfoSlice"
import playlistVideoSlice from "./playlistVideoSlice"
import myPlaylistsSlice from "./myPlaylistsSlice"

const store = configureStore({
    reducer: {
        user : userSlice,
        videos: videoSlice,
        watchHistory: watchHistorySlice,
        comments: commentSlice,
        recommendedVideos: recommendedVideosSlice,
        channel: channelSlice,
        channelVideos: channelVideoSlice,
        userPlaylists: userPlaylistsSlice,
        VideoInfo: VideoInfoSlice,
        playlistInfo: playlistInfoSlice,
        playlistVideos: playlistVideoSlice,
        myPlaylists: myPlaylistsSlice,
    }
});


export default store;