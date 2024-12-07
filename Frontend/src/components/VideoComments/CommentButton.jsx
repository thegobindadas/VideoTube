import React from 'react';
import { formatCommentsCount } from "../../utils/numberUtils"


export default function CommentButton({ totalComments, onClick }) {

  const commentsCount = formatCommentsCount(totalComments);

  return (
    <button
      className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden"
      onClick={onClick}
    >
      <h6 className="font-semibold">{commentsCount}...</h6>
    </button>
  );
}