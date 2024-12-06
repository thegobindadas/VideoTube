import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTimeAgo } from "../../utils/timeUtils";
import { handleError } from "../../utils/errorHandler";
import { formatViewsCount } from "../../utils/numberUtils";
import videoService from "../../services/videoService";
import { setLoading, setError, setVideoInfo, resetVideoInfo } from "../../store/videoInfoSlice";
import { addToWatchHistory } from "../../store/userSlice"
import { 
    Loader,
    SubscribeBtn,
    VideoPlayer,
    VideoOwnerDetails,
    VideoLikeDislikeButton, 
    PlaylistSaveButton, 
    CommentSection
} from "../index";


function VideoDetails({ videoId }) {
    
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.user)
    const { videoInfo, loading, error } = useSelector((state) => state.videoInfo);
    const [viewIncremented, setViewIncremented] = useState(false);


    const loadVideoDetails = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const videoData = await videoService.getVideoById({videoId})
            dispatch(setVideoInfo(videoData.data));
        } catch (error) {
            const errMsg = handleError(error)
            dispatch(setError(errMsg || "Failed to load video details."));
        }
    }, [dispatch, videoId]);


    useEffect(() => {
        const hasWatchedVideo = userData?.watchHistory.includes(videoId);
    
        if (videoInfo && !viewIncremented && !hasWatchedVideo) {
            videoService.handleVideoViews({videoId})
                .then((res) => {                    
                    setViewIncremented(true);
                    dispatch(setVideoInfo({ ...videoInfo, views: res.data.views }));
                    dispatch(addToWatchHistory(videoId));
                })
                .catch((error) => console.error("Error while incrementing views: ", handleError(error)));
        }
    }, [videoInfo, videoId, viewIncremented, userData?.watchHistory, dispatch]);
    


    useEffect(() => {
        loadVideoDetails();

        return () => dispatch(resetVideoInfo());
    }, [loadVideoDetails]);



    
    // Handle loading and error states
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="col-span-12 w-full">
            {videoInfo ? (
                <>
                    <VideoPlayer videoUrl={videoInfo.videoFile} />

                    <div className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5" role="button" tabIndex="0">
                        <div className="flex flex-wrap gap-y-2">
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <h1 className="text-lg font-bold">{videoInfo.title}</h1>
                                <p className="flex text-sm text-gray-200">{formatViewsCount(videoInfo.views)}  · {formatTimeAgo(videoInfo.createdAt)}</p>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                    <VideoLikeDislikeButton 
                                        videoId={videoInfo.videoId} 
                                        totalLikes={videoInfo.totalLikes}
                                        totalDislikes={videoInfo.totalDislikes}
                                        isVideoLikedByMe={videoInfo.isVideoLikedByMe}
                                    />

                                    <PlaylistSaveButton videoId={videoInfo.videoId} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">

                            <VideoOwnerDetails 
                                ownerId={videoInfo.ownerId}
                                avatar={videoInfo.ownerAvatar}
                                fullName={videoInfo.ownerName}
                                username={videoInfo.ownerUsername}
                                totalSubscribers={videoInfo.ownerTotalSubscribers}
                            />

                            
                            <div className="block">
                                {
                                    userData?._id !== videoInfo?.ownerId && (
                                        <SubscribeBtn 
                                            channelId={videoInfo.ownerId} 
                                            subscriptionStatus={videoInfo.isChannelSubscribed}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <hr className="my-4 border-white" />
                        
                        <div className="h-5 overflow-hidden group-focus:h-auto">
                            <p className="text-sm">{videoInfo.description}</p>
                        </div>
                    </div>

                    <CommentSection videoId={videoInfo.videoId} />
                </>
            ) : (
                <p>No video information available</p>
            )}
        </div>
    );
}


export default VideoDetails