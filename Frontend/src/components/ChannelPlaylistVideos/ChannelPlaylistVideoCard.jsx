import React from 'react'
import { convertSeconds, getTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from "../../utils/numberUtils";


function ChannelPlaylistVideoCard({
    videoThumbnail,
    videoDuration,
    videoTitle,
    videoViews,
    videoCreatedAt,
    videoOwnerId,
    videoOwnerAvatar,
    videoOwnerName,
    videoOwnerUsername,
}) {

    const duration = convertSeconds(videoDuration);
    const timeAgo = getTimeAgo(videoCreatedAt);
    const viewsCount = formatViewsCount(videoViews);
    
  return (
    <div className="border">
        <div className="w-full max-w-3xl gap-x-4 sm:flex">
            <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
                <div className="w-full pt-[56%]">
                    <div className="absolute inset-0">
                        <img
                            src={videoThumbnail}
                            alt={videoTitle}
                            className="h-full w-full" />
                    </div>
                    <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{duration}</span>
                </div>
            </div>
            <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                <div className="h-10 w-10 shrink-0 sm:hidden">
                    <img
                        src={videoOwnerAvatar}
                        alt={videoOwnerUsername}
                        className="h-full w-full rounded-full" />
                </div>
                <div className="w-full">
                    <h6 className="mb-1 font-semibold sm:max-w-[75%]">{videoTitle}</h6>
                    <p className="flex text-sm text-gray-200 sm:mt-3">{viewsCount} · {timeAgo}</p>
                    <div className="flex items-center gap-x-4">
                        <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                            <img
                                src={videoOwnerAvatar}
                                alt={videoOwnerUsername}
                                className="h-full w-full rounded-full" />
                        </div>
                        <p className="text-sm text-gray-200">{videoOwnerName}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default ChannelPlaylistVideoCard