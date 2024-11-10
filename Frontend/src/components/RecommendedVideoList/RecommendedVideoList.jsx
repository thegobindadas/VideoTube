import React, { useState, useEffect } from 'react'
import { RecommendedVideoItem } from "../index"
import videoServices from '../../services/videoServices';
import { useDispatch, useSelector } from 'react-redux';
import { setRecommendedVideos, setLoading, setError, resetRecommendedVideos } from '../../store/recommendedVideosSlice';
import { Link } from 'react-router-dom'

function RecommendedVideoList({ videoId }) {

  const { videos, loading, error } = useSelector((state) => state.recommendedVideos);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const response = await videoServices.getRecommendationVideos(videoId);

        dispatch(setRecommendedVideos(response.data.videos));  // Dispatch recommended videos to Redux store
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    if (videoId) {
      fetchRecommendedVideos();
    }

    // Cleanup on component unmount or videoId change
    return () => {
      dispatch(resetRecommendedVideos());
    };
  }, [videoId, dispatch]);




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]"> 
        {videos.map((video) => (
          <Link to={`/watch/${video.videoId}`} key={video.videoId}>
            <RecommendedVideoItem
              thumbnail={video.thumbnail}
              title={video.title}
              duration={video.duration}
              views={video.views}
              createdAt={video.createdAt}
              ownerId={video.ownerId}
              ownerUsername={video.ownerUsername}
              ownerName={video.ownerName}
              ownerAvatar={video.ownerAvatar}
            />
          </Link>
        ))}
    </div>
  )
}

export default RecommendedVideoList
