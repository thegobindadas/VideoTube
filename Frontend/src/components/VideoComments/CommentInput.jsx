import React, { useState } from 'react';
import { formatCommentsCount } from "../../utils/numberUtils"
import commentServices from "../../services/commentServices"
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../store/commentSlice';
import { Link } from 'react-router-dom'

const CommentInput = ({ videoId, totalComments }) => {

  const userData = useSelector((state) => state.user.user)
  const comments = useSelector((state) => state.comments.comments);
  const commentsCount = formatCommentsCount(totalComments);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAddComment = async() => {
    try {
      if (content.trim()) {
        const addComment = await commentServices.addComment(videoId, content)
        
        if (addComment.data) {
          const fullComment = {
            _id: addComment.data._id,
            content: addComment.data.content,
            createdAt: addComment.data.createdAt,
            owner: {
              _id: userData._id,
              username: userData.username,
              fullName: userData.fullName,
              avatar: userData.avatar,
            },
            video: videoId,
          };
          
          dispatch(setComments([fullComment, ...comments]));

          setContent('');
        }
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
      throw error
    }
  };

  
  return (
    <div className="block">
        <h6 className="mb-4 font-semibold">{commentsCount}</h6>
        <input
            type="text"
            className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
            placeholder="Add a Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
        />
    </div>
  );
};


export default CommentInput;