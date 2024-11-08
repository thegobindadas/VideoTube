import React, { useState, useCallback, useEffect } from 'react'
import { getTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from '../../utils/numberUtils';
import { VideoPlayer, VideoLikeDislikeButton, SaveToPlaylist, VideoOwnerDetails, SubscribeBtn, CommentSection } from "../index";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import videoServices from '../../services/videoServices';


function VideoDetails() {
    const { videoId } = useParams();
    const [videoInfo, setVideoInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewIncremented, setViewIncremented] = useState(false);
    

    const loadVideoDetails = useCallback(async () => {
        setLoading(true);
        try {
            const videoData = await videoServices.fetchVideoById(videoId)
            setVideoInfo(videoData.data);
        } catch (error) {
            setError(error.message || 'Failed to load video details.');
        } finally {
            setLoading(false);
        }
    }, [videoId]);


    useEffect(() => {
        if (videoInfo && !viewIncremented) {
            videoServices.incrementVideoViews(videoId)
                .then(() => setViewIncremented(true))
                .catch(error => console.error("Error while incrementing views: ", error.message));
        }
    }, [videoInfo, videoId, viewIncremented]);


    useEffect(() => {
        loadVideoDetails();
    }, [loadVideoDetails]);



    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
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
                                <p className="flex text-sm text-gray-200">{formatViewsCount(videoInfo.views)}  · {getTimeAgo(videoInfo.createdAt)}</p>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                    <VideoLikeDislikeButton videoId={videoInfo._id} />
                                    <SaveToPlaylist />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">

                            <VideoOwnerDetails channelId={videoInfo.owner}  />

                            <div className="block">
                                <SubscribeBtn channelId={videoInfo.owner} />
                            </div>
                        </div>

                        <hr className="my-4 border-white" />
                        
                        <div className="h-5 overflow-hidden group-focus:h-auto">
                            <p className="text-sm">{videoInfo.description}</p>
                        </div>
                    </div>

                    <CommentSection videoId={videoInfo._id} />
                </>
            ) : (
                <p>No video information available</p>
            )}
        </div>
    );
}

export default VideoDetails
