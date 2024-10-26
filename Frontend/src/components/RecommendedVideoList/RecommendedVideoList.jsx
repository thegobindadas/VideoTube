import React, { useState } from 'react'
import { RecommendedVideoItem } from "../index"

function RecommendedVideoList() {
    
  const [videos, setVideos] = useState([])

  return (
    <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]"> 
        {videos.map((video) => (
            <RecommendedVideoItem
                key={video._id}
                _id={video._id}
                thumbnail={video.thumbnail}
                title={video.title}
                duration={video.duration}
                authorAvatar={video.owner.avatar}
                authorName={video.owner.fullName}
                views={video.views}
                createdAt={video.createdAt}
            />
        ))}
    </div>
  )
}

export default RecommendedVideoList
