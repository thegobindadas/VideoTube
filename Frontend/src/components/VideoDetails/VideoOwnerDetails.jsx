import React, { useState, useEffect } from 'react'
import { formatSubscriberCount } from '../../utils/numberUtils';
import videoServices from '../../services/videoServices';
import { Link } from 'react-router-dom';
import { setOwnerInfo, setLoading, setError, resetOwnerInfo } from '../../store/ownerSlice';
import { useDispatch, useSelector } from 'react-redux';

function VideoOwnerDetails({ channelId }) {

  const dispatch = useDispatch();
  const { ownerInfo, loading, error } = useSelector((state) => state.owner);


  useEffect(() => {
    const fetchVideoOwnerDetails = async () => {
      dispatch(setLoading());
      try {
        const ownerData = await videoServices.getVideoOwnerDetails(channelId);
        if (ownerData && ownerData.data) {
          dispatch(setOwnerInfo(ownerData.data));
        }
      } catch (error) {
        console.error('Error fetching video owner details:', error);
        dispatch(setError('Failed to load owner information'));
      }
    };

    if (channelId) {
      fetchVideoOwnerDetails();
    }


    return () => {
      dispatch(resetOwnerInfo());
    };
  }, [channelId, dispatch]);




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="flex items-center gap-x-4">
      <div className="mt-2 h-12 w-12 shrink-0">
        <img 
          src={ownerInfo?.avatar} 
          alt={ownerInfo?.fullName || "Video Owner"} 
          className="h-full w-full rounded-full" />
      </div>
      <div className="block">
        <p className="text-gray-200">
          <Link to={`/channel/${ownerInfo?.username}`}>
            {ownerInfo?.fullName || "Unknown"}
          </Link>
        </p>
        <p className="text-sm text-gray-400">
          {formatSubscriberCount(ownerInfo?.totalSubscribers || 0)}
        </p>
      </div>
    </div>
  )
}


export default VideoOwnerDetails