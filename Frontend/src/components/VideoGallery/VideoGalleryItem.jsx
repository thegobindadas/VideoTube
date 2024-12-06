import React from 'react'
import { formatDuration, formatTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from "../../utils/numberUtils"
import { Link } from 'react-router-dom';

function VideoGalleryItem({ video }) {

  const videoDuration = formatDuration(video.duration);
  const timeAgo = formatTimeAgo(video.createdAt);
  const viewsCount = formatViewsCount(video.views);

    
  return (
    <div className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full" />
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{videoDuration}</span>
      </div>

      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0">
          <img
            src={video.owner.avatar}
            alt={video.owner.fullName}
            className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold">{video.title}</h6>
          <p className="flex text-sm text-gray-200">{viewsCount} · {timeAgo}</p>
          <p className="text-sm text-gray-200">
            {video.owner.fullName}
          </p>
        </div>
      </div>
    </div>
  )
}


export default VideoGalleryItem