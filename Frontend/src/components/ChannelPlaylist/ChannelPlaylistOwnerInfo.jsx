import React from 'react'
import { formatSubscriberCount } from "../../utils/numberUtils"

function ChannelPlaylistOwnerInfo({ ownerId, ownerAvatar, ownerName, ownerUsername, ownerTotalSubscribers}) {
  return (
    <div className="mt-6 flex items-center gap-x-3">
        <div className="h-16 w-16 shrink-0">
            <img
                src={ownerAvatar}
                alt={ownerName}
                className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
            <h6 className="font-semibold">{ownerName}</h6>
            <p className="text-sm text-gray-300">{formatSubscriberCount(ownerTotalSubscribers)}</p>
        </div>
    </div>
  )
}


export default ChannelPlaylistOwnerInfo