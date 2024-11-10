import React from 'react';
import { getTimeAgo } from '../../utils/timeUtils';

export default function CommentItem({ ownerId, fullName, username, avatar, content, createdAt }) {

    const timeAgo = getTimeAgo(createdAt);

  return (
    <div className="flex gap-x-4">
      <div className="mt-2 h-11 w-11 shrink-0">
        <img src={avatar} alt={username} className="h-full w-full rounded-full" />
      </div>
      <div className="block">
        <p className="flex items-center text-gray-200">
          {fullName} · <span className="text-sm">{timeAgo}</span>
        </p>
        <p className="text-sm text-gray-200">@{username}</p>
        <p className="mt-3 text-sm">{content}</p>
      </div>
    </div>
  );
}