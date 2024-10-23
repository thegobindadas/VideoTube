import React, { useEffect, useState, useCallback } from 'react'
import { Sidebar, VideoCard } from "../components/index"
import axios from 'axios';


function VideoGalleryPage() {

    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    const fetchVideos = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`/api/v1/video`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
            console.log(response.data.data.videos);
            setVideos(response.data.data.videos)
        } catch (err) {
            setError(err.message);
        }
    }, []);


    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    
  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />

        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                {videos.map((video) => (
                    <VideoCard
                        key={video._id}
                        _id={video._id}
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        avatar={video.owner.avatar}
                        title={video.title}
                        views={video.views}
                        timeAgo={video.createdAt}
                        author={video.owner.fullName}
                    />
                ))}
            </div>
            
        </section>
    </div>
  )
}

export default VideoGalleryPage
