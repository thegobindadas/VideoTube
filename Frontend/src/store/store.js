import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import videoInfoSlice from "./videoInfoSlice";
import commentSlice from "./commentSlice";
import recommendedVideoSlice from "./recommendedVideosSlice";
import watchHistorySlice from "./watchHistorySlice";
import myPlaylistSlice from "./myPlaylistSlice";
import channelSlice from "./channelSlice";
import channelVideoSlice from "./channelVideoSlice";
import channelPlaylistSlice from "./channelPlaylistSlice"
import channelTweetSlice from "./channelTweetSlice";
import subscribedChannelSlice from "./subscribedChannelSlice"
import playlistSlice from "./playlistSlice"


const store = configureStore({
    reducer: {
        user : userSlice,
        videos: videoSlice,
        videoInfo: videoInfoSlice,
        comments: commentSlice,
        recommendedVideos: recommendedVideoSlice,
        watchHistory: watchHistorySlice,
        myPlaylistNames: myPlaylistSlice,
        channel: channelSlice,
        channelVideos: channelVideoSlice,
        channelPlaylists: channelPlaylistSlice,
        channelTweets: channelTweetSlice,
        subscribedChannels: subscribedChannelSlice,
        playlist: playlistSlice,
    }
});



export default store;