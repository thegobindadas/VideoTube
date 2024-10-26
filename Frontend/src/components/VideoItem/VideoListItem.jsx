import React from 'react'
import { convertSeconds, getTimeAgo } from '../../utils/timeUtils';

function VideoListItem({ _id, thumbnail, duration, avatar, title, views, createdAt, author, description }) {

  const videoDuration = convertSeconds(duration);
  const timeAgo = getTimeAgo(createdAt);


  return (
    <div className="w-full max-w-3xl gap-x-4 md:flex">
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full" />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{videoDuration}</span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <img
            src={avatar}
            alt={author}
            className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold md:max-w-[75%]">{title}</h6>
          <p className="flex text-sm text-gray-200 sm:mt-3">{views} Views · {timeAgo}</p>
          <div className="flex items-center gap-x-4">
            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
              <img
                src={avatar}
                alt={author}
                className="h-full w-full rounded-full" />
            </div>
            <p className="text-sm text-gray-200">{author}</p>
          </div>
          <p className="mt-2 hidden text-sm md:block">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoListItem
