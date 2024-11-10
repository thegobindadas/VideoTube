import React from 'react'
import { convertSeconds, getTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from "../../utils/numberUtils"


function RecommendedVideoItem({ thumbnail, title, duration, views, createdAt, ownerId, ownerUsername, ownerName, ownerAvatar }) {

    const videoDuration = convertSeconds(duration);
    const timeAgo = getTimeAgo(createdAt);
    const viewsCount = formatViewsCount(views);


  return (
    <div className="w-full gap-x-2 border pr-2 md:flex">
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
        <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
            <div className="h-12 w-12 shrink-0 md:hidden">
            <img
                src={ownerAvatar}
                alt={ownerName}
                className="h-full w-full rounded-full" />
            </div>
            <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">{title}</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">{ownerName}</p>
                <p className="flex text-sm text-gray-200">{viewsCount} · {timeAgo}</p>
            </div>
        </div>
    </div>
  )
}


export default RecommendedVideoItem