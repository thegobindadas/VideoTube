import { useState, useEffect, useCallback } from "react";
import { LikeIcon, DislikeIcon } from "../../assets"
import { formatLikeCount } from '../../utils/numberUtils';
import axios from "axios";

const VideoLikeDislikeButton = ({ videoId, initialLikes, initialDislikes }) => {
  
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [likeStatus, setLikeStatus] = useState(null);

  // Function to handle like/dislike actions
  const toggleLikeDislike = async (type) => {
    try {
      await axios.post(`/api/v1/likes/toggle/v/${videoId}`, { type });
      updateCounts(type);
    } catch (error) {
      console.error('Error toggling like/dislike:', error);
    }
  };

  // Function to update like/dislike counts based on current status
  const updateCounts = (type) => {
    setLikes((prevLikes) => {
      if (type === 'like') {
        return likeStatus === 'like' ? prevLikes - 1 : prevLikes + 1;
      }
      return prevLikes - (likeStatus === 'like' ? 1 : 0);
    });
    
    setDislikes((prevDislikes) => {
      if (type === 'dislike') {
        return likeStatus === 'dislike' ? prevDislikes - 1 : prevDislikes + 1;
      }
      return prevDislikes - (likeStatus === 'dislike' ? 1 : 0);
    });

    setLikeStatus((prevStatus) => (prevStatus === type ? null : type));
  };

  // Function to check the current like/dislike status of the video
  const checkVideoLikeStatus = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/likes/like-status/v/${videoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLikeStatus(response.data.data.status);
    } catch (error) {
      console.error('Error fetching like/dislike status:', error.message);
    }
  }, [videoId]);

  // Check like/dislike status on component mount
  useEffect(() => {
    checkVideoLikeStatus();
  }, [checkVideoLikeStatus]);



  return (
    <div className="flex overflow-hidden rounded-lg border">
      <button
        className={`group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 `}
        onClick={() => toggleLikeDislike('like')}
      >
        <span className={`inline-block w-5`}>
          <LikeIcon type={likeStatus === "like" ? 'filled' : 'outlined'} />
        </span>
        {formatLikeCount(likes)}
      </button>

      <button
        className={`group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 `}
        onClick={() => toggleLikeDislike('dislike')}
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
