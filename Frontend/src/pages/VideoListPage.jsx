import React, { useState } from 'react'
import { Sidebar, VideoListItem } from "../components/index"
import axios from 'axios';


function VideoListPage() {

    const [videos, setVideos] = useState([])

  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
    <Sidebar />

    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {videos.map((video) => (
            <VideoListItem
                key={video._id}
                _id={video._id}
                thumbnail={video.thumbnail}
                duration={video.duration}
                avatar={video.owner.avatar}
                title={video.title}
                views={video.views}
                createdAt={video.createdAt}
                author={video.owner.fullName}
                description={video.description}
            />
        ))}
      </div>
    </section>
  </div>
  )
}

export default VideoListPage
