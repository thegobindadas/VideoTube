import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from "../../assets";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../../utils/timeUtils";


export default function CommentItem({ comment, onUpdateComment, onDeleteComment }) {

  const timeAgo = formatTimeAgo(comment.createdAt);

  const userData = useSelector((state) => state.user.user)
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.content);

  
  const saveEdit = () => {
    onUpdateComment(comment._id, updatedComment);
    setIsEditing(false);
  };



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
            {comment.owner.fullName} ·{" "}
            <span className="text-sm">{timeAgo}</span>
          </p>
          {userData._id === comment.owner._id && (
            <span className="flex gap-2">
              <button
                className="h-5 w-5 hover:text-[#ae7aff]"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                <EditIcon />
              </button>
              <button
                className="h-5 w-5 hover:text-[#ae7aff]"
                onClick={() => onDeleteComment(comment._id)}
              >
                <DeleteIcon />
              </button>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-200">@{comment.owner.username}</p>
        {!isEditing ? (
          <p className="mt-3 text-sm">{comment.content}</p>
        ) : (
          <div className="mt-3 flex flex-col gap-y-2">
            <textarea
              className="w-full rounded-lg border border-gray-600 p-2 text-sm bg-transparent text-white"
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></textarea>
            <div className="flex gap-x-2">
              <button
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg"
                onClick={saveEdit}
              > Save </button>
              <button
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
                onClick={() => setIsEditing(false)}
              > Cancel </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}