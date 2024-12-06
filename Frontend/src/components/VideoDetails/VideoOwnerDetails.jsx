import React from 'react';
import { Link } from 'react-router-dom';
import { formatSubscriberCount } from "../../utils/numberUtils";


function VideoOwnerDetails({ ownerId, avatar, fullName, username, totalSubscribers }) {

  return (
    <div className="flex items-center gap-x-4">
      <div className="mt-2 h-12 w-12 shrink-0">
        <img 
          src={avatar} 
          alt={fullName || "Video Owner"} 
          className="h-full w-full rounded-full" />
      </div>
      <div className="block">
        <p className="text-gray-200">
          <Link to={`/channel/${username}`}>
            {fullName || "Unknown"}
          </Link>
        </p>
        <p className="text-sm text-gray-400">
          {formatSubscriberCount(totalSubscribers || 0)}
        </p>
      </div>
    </div>
  )
}


export default VideoOwnerDetails