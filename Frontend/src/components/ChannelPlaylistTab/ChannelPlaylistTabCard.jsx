import React from 'react'
import { getTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from "../../utils/numberUtils"

function ChannelPlaylistTabCard({ name, description, createdAt, totalVideos, thumbnail, views=0}) {

    const timeAgo = getTimeAgo(createdAt);
    const viewsCount = formatViewsCount(views);

  return (
    <div className="w-full">
        <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
                <img
                    src={thumbnail}
                    alt={name}
                    className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0">
                    <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                        <div className="relative z-[1]">
                            <p className="flex justify-between">
                                <span className="inline-block">Playlist</span>
                                <span className="inline-block">{totalVideos} videos</span>
                            </p>
                            <p className="text-sm text-gray-200">{viewsCount} · {timeAgo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h6 className="mb-1 font-semibold">{name}</h6>
        <p className="flex text-sm text-gray-200">{description}.</p>
    </div>
  )
}

export default ChannelPlaylistTabCard
