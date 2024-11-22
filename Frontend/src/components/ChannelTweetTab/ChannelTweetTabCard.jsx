import React, { forwardRef } from 'react'
import { getTimeAgo } from '../../utils/timeUtils';
import { TweetLikeDislikeButton } from "../index"


const ChannelTweetTabCard = forwardRef(({ tweet }, ref) => {

  const timeAgo = getTimeAgo(tweet.createdAt);

  return (
    <div ref={ref} className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
        <div className="h-14 w-14 shrink-0">
            <img
                src={tweet.owner.avatar}
                alt={tweet.owner.fullName}
                className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
            <h4 className="mb-1 flex items-center gap-x-2">
                <span className="font-semibold">{tweet.owner.fullName}</span>
                 
                <span className="inline-block text-sm text-gray-400">{timeAgo}</span>
            </h4>
            <p className="mb-2">{tweet.content}</p>

            
           <TweetLikeDislikeButton tweetId={tweet._id} likeCount={tweet.likeCount} dislikeCount={tweet.dislikeCount} />
            
        </div>
    </div>
  )
})

export default ChannelTweetTabCard
