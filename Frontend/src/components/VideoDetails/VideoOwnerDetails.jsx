import React, { useState, useEffect } from 'react'
import { formatSubscriberCount } from '../../utils/numberUtils';
import videoServices from '../../services/videoServices';
import { Link } from 'react-router-dom';


function VideoOwnerDetails({ channelId }) {

  const [videoOwnerInfo, setVideoOwnerInfo] = useState({
    "_id": "",
    "username": "",
    "fullName": "",
    "avatar": "",
    "totalSubscribers": 0,
  });


  useEffect(() => {
    const fetchVideoOwnerDetails = async () => {
      try {
        const ownerData = await videoServices.getVideoOwnerDetails(channelId);
        if (ownerData && ownerData.data) {
          const { _id, username, fullName, avatar, totalSubscribers } = ownerData.data;
          setVideoOwnerInfo({
            _id,
            username,
            fullName,
            avatar,
            totalSubscribers,
          });
        }
      } catch (error) {
        console.error('Error fetching video owner details:', error);
      }
    };

    if (channelId) {
      fetchVideoOwnerDetails();
    }
  }, [channelId]);



  return (
    <div className="flex items-center gap-x-4">
      <div className="mt-2 h-12 w-12 shrink-0">
        <img src={videoOwnerInfo.avatar} alt={videoOwnerInfo.fullName || "Video Owner"} className="h-full w-full rounded-full" />
      </div>
      <div className="block">
        <p className="text-gray-200"><Link to={`/${videoOwnerInfo._id}`}>{videoOwnerInfo.fullName || "Unknown"}</Link></p>
        <p className="text-sm text-gray-400">{formatSubscriberCount(videoOwnerInfo.totalSubscribers)} </p>
      </div>
    </div>
  )
}


export default VideoOwnerDetails