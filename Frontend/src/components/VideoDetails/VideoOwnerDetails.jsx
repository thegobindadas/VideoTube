import React, { useState, useEffect } from 'react'
import { formatSubscriberCount } from '../../utils/numberUtils';
import videoServices from '../../services/videoServices';
import { Link } from 'react-router-dom';
import { setOwnerInfo, setLoading, setError, resetOwnerInfo } from '../../store/ownerSlice';
import { useDispatch, useSelector } from 'react-redux';

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