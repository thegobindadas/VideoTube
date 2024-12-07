import React from 'react';
import { EditIcon, DeleteIcon } from "../../assets";
import { formatTimeAgo } from "../../utils/timeUtils";


export default function CommentItem({ comment }) {

  const timeAgo = formatTimeAgo(comment.createdAt);

  return (
    <div className="flex gap-x-4">
      <div className="mt-2 h-11 w-11 shrink-0">
        <img
          src={comment.owner.avatar}
          alt={comment.owner.username}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="block flex-1">
        <div className="flex items-center justify-between text-gray-200">
          <p>
            {comment.owner.fullName} · 
            <span className="text-sm">{timeAgo}</span>
          </p>
          <span className="flex gap-2">
            <button className="h-5 w-5 hover:text-[#ae7aff]">
              <EditIcon />
            </button>
            <button className="h-5 w-5 hover:text-[#ae7aff]">
              <DeleteIcon />
            </button>
          </span>
        </div>
        <p className="text-sm text-gray-200">@{comment.owner.username}</p>
        <p className="mt-3 text-sm">{comment.content}</p>
      </div>
    </div>
  );
}
