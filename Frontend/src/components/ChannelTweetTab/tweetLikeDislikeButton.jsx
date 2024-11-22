import React, { useState, useEffect, useCallback } from 'react'
import { LikeIcon, DislikeIcon } from "../../assets"
import tweetService from "../../services/tweetService"
import { formatNumber } from '../../utils/numberUtils';

function TweetLikeDislikeButton({tweetId, likeCount = 0, dislikeCount = 0 }) {

  const [likes, setLikes] = useState(likeCount);
  const [dislikes, setDislikes] = useState(dislikeCount);
  const [likeStatus, setLikeStatus] = useState(null);


  const loadLikeDislikeStatus = useCallback(async () => {
    try {
      const statusResponse = await tweetService.isTweetLikeDislike(tweetId);
      setLikeStatus(statusResponse.data.status);
    } catch (error) {
      console.error('Error loading like/dislike status:', error);
    }
  }, [tweetId]);


  const handleToggleLikeDislike = async (type) => {
    if (type !== 'like' && type !== 'dislike') return;
    try {
      await tweetService.togggleTweetLikeDislike(tweetId, type);
      updateLikeDislikeCount(type);
    } catch (error) {
      console.error('Error toggling tweet like/dislike:', error);
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
    <div className="flex gap-4">
      <button
        className={`group inline-flex items-center gap-x-1 `}
        onClick={() => handleToggleLikeDislike('like')}
      >
        <span className={`inline-block w-5`}>
          <LikeIcon type={likeStatus === "like" ? 'filled' : 'outlined'} />
        </span>
        {formatNumber(likes)}
      </button>
      <button
        className={`group inline-flex items-center gap-x-1 `}
        onClick={() => handleToggleLikeDislike('dislike')}
        >
        <span className={`inline-block w-5`}>
          <DislikeIcon type={likeStatus === "dislike" ? 'filled' : 'outlined'} />
        </span>
        {formatNumber(dislikes)}
      </button>
    </div>
  )
}

export default TweetLikeDislikeButton
