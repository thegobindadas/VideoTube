import React from 'react'
import { convertSeconds, getTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from "../../utils/numberUtils"
import { Link } from 'react-router-dom';

function VideoGalleryItem({ _id, thumbnail, duration, avatar, title, views, createdAt, authorId, authorUsername, author }) {

  const videoDuration = convertSeconds(duration);
  const timeAgo = getTimeAgo(createdAt);
  const viewsCount = formatViewsCount(views);

  
  return (
    <div className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
          src={thumbnail}
          alt={title}
          className="h-full w-full" />
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{videoDuration}</span>
      </div>

      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0">
          <img
            src={avatar}
            alt={author}
            className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold">{title}</h6>
          <p className="flex text-sm text-gray-200">{viewsCount} · {timeAgo}</p>
          <p className="text-sm text-gray-200">
            {author}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoGalleryItem
