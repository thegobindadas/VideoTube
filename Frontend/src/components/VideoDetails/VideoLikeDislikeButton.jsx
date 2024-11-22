import { useState, useEffect, useCallback } from "react";
import { LikeIcon, DislikeIcon } from "../../assets"
import { formatLikeCount } from '../../utils/numberUtils';
import videoServices from '../../services/videoServices';

const VideoLikeDislikeButton = ({ videoId }) => {
  
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(null);


  const loadLikeDislikeStatus = useCallback(async () => {
    try {
      const statusResponse = await videoServices.isVideoLikeDislike(videoId);
      const countResponse = await videoServices.videoLikeDislikeCount(videoId);
      setLikeStatus(statusResponse.data.status);
      setLikes(countResponse.data.totalLikes);
      setDislikes(countResponse.data.totalDislikes);
    } catch (error) {
      console.error('Error loading like/dislike status:', error);
    }
  }, [videoId]);


  const handleToggleLikeDislike = async (type) => {
    try {
      await videoServices.toggleVideoLikeDislike(videoId, type);
      updateLikeDislikeCount(type);
    } catch (error) {
      console.error('Error toggling like/dislike:', error);
    }
  };


  const updateLikeDislikeCount = (type) => {
    setLikes((prevLikes) => prevLikes + (type === 'like' ? (likeStatus === 'like' ? -1 : 1) : likeStatus === 'like' ? -1 : 0));
    setDislikes((prevDislikes) => prevDislikes + (type === 'dislike' ? (likeStatus === 'dislike' ? -1 : 1) : likeStatus === 'dislike' ? -1 : 0));
    setLikeStatus((prevStatus) => (prevStatus === type ? null : type));
  };


  useEffect(() => {
    loadLikeDislikeStatus();
  }, [loadLikeDislikeStatus]);



  return (
    <div className="flex overflow-hidden rounded-lg border">
      <button
        className={`group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 `}
        onClick={() => handleToggleLikeDislike('like')}
      >
        <span className={`inline-block w-5`}>
          <LikeIcon type={likeStatus === "like" ? 'filled' : 'outlined'} />
        </span>
        {formatLikeCount(likes)}
      </button>

      <button
        className={`group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 `}
        onClick={() => handleToggleLikeDislike('dislike')}
      >
        <span className={`inline-block w-5`}>
          <DislikeIcon type={likeStatus === "dislike" ? 'filled' : 'outlined'} />
        </span>
        {formatLikeCount(dislikes)}
      </button>
    </div>
  );
};


export default VideoLikeDislikeButton;
