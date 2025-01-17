import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Loader, CommentButton, CommentInput, CommentItem } from "../index";
import { handleError } from "../../utils/errorHandler"
import { useDispatch, useSelector } from 'react-redux';
import commentService from "../../services/commentService";
import { 
  setVideoComments,
  updateComment,
  deleteComment,
  setLoading, 
  setError, 
  setPage, 
  setHasMore, 
  resetVideoComments 
} from '../../store/commentSlice';


export default function CommentSection({ videoId }) {

  const { videoComments, loading, error, page, hasMore } = useSelector((state) => state.comments);
  const [showComments, setShowComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0)
  const [totalPages, setTotalPages] = useState(1);
  const loader = useRef(null);
  const dispatch = useDispatch();


  const toggleComments = () => {
    setShowComments(!showComments);
  };


  const onUpdateComment = async (commentId, updatedContent) => {
    try {
      
      if (!updatedContent.trim()) {
        dispatch(setError("Comment content cannot be empty or just spaces."));
        return;
      }

      dispatch(setLoading(true));

      const response = await commentService.updateComment({ commentId, content: updatedContent });
      
      if (response.success) {
        dispatch(updateComment({ id: response.data._id, content: response.data.content }));
      }
    } catch (error) {
      const errMsg = handleError(error)
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  const onDeleteComment = async (commentId) => {
    try {
      dispatch(setLoading(true));
      const response = await commentService.deleteComment({commentId});

      if (response.success) {
        dispatch(deleteComment(commentId));
      }
    } catch (error) {
      const errMsg = handleError(error)
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  };


  const fetchComments = useCallback(async (videoId, page) => {
    try {
      dispatch(setLoading(true));            
      const response = await commentService.fetchVideoComments({videoId, page})

      const fetchedComments = response.data.comments;
      setTotalPages(response.data.totalPages);
      setTotalComments(response.data.totalComments)

      if (page >= response.data.totalPages) {
        dispatch(setHasMore(false)); 
      }

      dispatch(setVideoComments(fetchedComments));
    } catch (error) {
      const errMsg = handleError(error)
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);


  useEffect(() => {
    dispatch(resetVideoComments());
    setTotalComments(0);
    setTotalPages(1);
  }, [dispatch, videoId]);


  useEffect(() => {
    if (page <= totalPages) {
      fetchComments(videoId, page);
    }
  }, [fetchComments, page, totalPages, videoId]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && page < totalPages) {
          dispatch(setPage(page + 1));
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore, loading, dispatch, page, totalPages]);
  



  if (loading && videoComments.length === 0) return <Loader />;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <CommentButton totalComments={totalComments} onClick={toggleComments} />

      <div
        className={`fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 ${
          showComments ? 'top-[67px]' : ''
        } peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none`}
      >
        <CommentInput videoId={videoId} totalComments={totalComments} />

        <hr className="my-4 border-white" />
            

        {videoComments.length === 0 && !loading && (
          <p className="text-center text-gray-500">No comments available.</p>
        )}
  
        {videoComments.map((comment) => (
          <div key={comment._id}>
            <CommentItem 
              comment={comment}
              onUpdateComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
            />
            <hr className="my-4 border-white" />
          </div>
        ))}
  
        {/* Show loader while new comments are being fetched */}
        {loading && <Loader />}
  
        {/* Show "No more comments" message if all comments have been loaded */}
        {page >= totalPages && videoComments.length > 0 && !loading && (
          <p className="text-center text-gray-500">No more comments to load.</p>
        )}

        <div ref={loader} className="loader"></div>
      </div>
    </>
  );
}