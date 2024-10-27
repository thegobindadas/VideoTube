import React, { useState, useEffect } from 'react'
import { getTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount, formatSubscriberCount } from '../../utils/numberUtils';
import { VideoPlayer, VideoLikeDislikeButton, SaveToPlaylist, SubscribeBtn } from "../index"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


function VideoDetails() {
    const { videoId } = useParams();
    const [videoInfo, setVideoInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const fetchVideoInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/api/v1/video/${videoId}/info`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            setVideoInfo(response.data.data);
            incrementVideoViews();
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setError(error.message || 'Something went wrong');
            setLoading(false);
        }
    };

    const incrementVideoViews = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            
            await axios.post(`/api/v1/video/${videoId}/increment-views`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error incrementing views:', error.message);
        }
    };


    useEffect(() => {
        fetchVideoInfo(); 
    }, [videoId]);

    
    



    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="col-span-12 w-full">
            {videoInfo ? (
                <>
                    <VideoPlayer videoUrl={videoInfo.videoUrl} />

                    <div className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5" role="button" tabIndex="0">
                        <div className="flex flex-wrap gap-y-2">
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <h1 className="text-lg font-bold">{videoInfo.title}</h1>
                                <p className="flex text-sm text-gray-200">{formatViewsCount(videoInfo.views)}  · {getTimeAgo(videoInfo.createdAt)}</p>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                    <VideoLikeDislikeButton videoId={videoId} initialLikes={videoInfo.totalLikes} initialDislikes={videoInfo.totalDislikes} />
                                    <SaveToPlaylist />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <div className="mt-2 h-12 w-12 shrink-0">
                                    <img src={videoInfo.authorAvatar} alt={videoInfo.authorName} className="h-full w-full rounded-full" />
                                </div>
                                <div className="block">
                                    <p className="text-gray-200"><Link to={`/${videoInfo.authorId}`}>{videoInfo.authorName}</Link></p>
                                    <p className="text-sm text-gray-400">{formatSubscriberCount(videoInfo.authorTotalSubscribers)} </p>
                                </div>
                            </div>
                            <div className="block">
                                <SubscribeBtn channelId={videoInfo.authorId} />
                            </div>
                        </div>

                        <hr className="my-4 border-white" />
                        
                        <div className="h-5 overflow-hidden group-focus:h-auto">
                            <p className="text-sm">{videoInfo.description}</p>
                        </div>
                    </div>

                    <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                        <h6 className="font-semibold">573 Comments...</h6>
                    </button>
                    <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                        <div className="block">
                            <h6 className="mb-4 font-semibold">573 Comments</h6>
                            <input type="text" className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white" placeholder="Add a Comment" />
                        </div>
                        <hr className="my-4 border-white" />
                    </div>
                </>
            ) : (
                <p>No video information available</p>
            )}
        </div>
    );
}

export default VideoDetails
