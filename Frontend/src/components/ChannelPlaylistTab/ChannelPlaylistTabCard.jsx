import React from 'react';
import { noPhotoBackground } from "../../utils/constants";
import { formatTimeAgo } from '../../utils/timeUtils';
import { formatViewsCount } from "../../utils/numberUtils";


function ChannelPlaylistTabCard({ playlist }) {

    const timeAgo = formatTimeAgo(playlist.createdAt);
    const viewsCount = formatViewsCount(Number(playlist?.views) || 0);


  return (
    <div className="w-full">
        <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
                <img
                    src={playlist?.firstVideoThumbnail || noPhotoBackground}
                    alt={playlist.name}
                    className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0">
                    <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                        <div className="relative z-[1]">
                            <p className="flex justify-between">
                                <span className="inline-block">Playlist</span>
                                <span className="inline-block">{playlist.totalVideos} videos</span>
                            </p>
                            <p className="text-sm text-gray-200">{viewsCount} · {timeAgo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h6 className="mb-1 font-semibold">{playlist.name}</h6>
        <p className="flex text-sm text-gray-200">{playlist.description}.</p>
    </div>
  )
}


export default ChannelPlaylistTabCard