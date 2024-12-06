import { useState, useEffect, useCallback } from "react";
import { LikeIcon, DislikeIcon } from "../../assets"
import { formatLikeCount } from '../../utils/numberUtils';
import videoService from '../../services/videoService';

const VideoLikeDislikeButton = ({ videoId, totalLikes, totalDislikes, isVideoLikedByMe }) => {
  
  const [likes, setLikes] = useState(totalLikes || 0);
  const [dislikes, setDislikes] = useState(totalDislikes || 0);
  const [likeStatus, setLikeStatus] = useState(isVideoLikedByMe || null);


  const fetchLikeDislikeStatus = useCallback(async () => {
    if (isVideoLikedByMe === undefined) {
      try {
        const response = await videoService.isVideoLikeDislikeByUser({ videoId });
        setLikeStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching like/dislike status:", error);
      }
    }
  }, [videoId, isVideoLikedByMe]);
  

  const handleToggleLikeDislike = async (type) => {
    try {
      await videoService.toggleVideoLikeDislike({videoId, type});
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
    fetchLikeDislikeStatus();
  }, [fetchLikeDislikeStatus]);



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